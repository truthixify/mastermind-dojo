import type React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../../hooks/use-toast'
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { BigNumberish, uint256, Uint256 } from 'starknet'
import { MaxUint256, randomBytes } from 'ethers'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useSystemCalls } from '../../dojo/useSystemCalls'
import { useGameStore } from '../../stores/gameStore'
import { useGameStorage } from '../../hooks/use-game-storage'
import { poseidonHashBN254, init as initGaraga } from 'garaga'
import { useDictionary } from '../../context/dictionary'

interface commitSolutionHashProps {
    onCommit: () => void
    onBack: () => void
}

const randomBigInt = (num_bytes: number = 31) => {
    const randomByte = randomBytes(num_bytes)
    const hexString = Buffer.from(randomByte).toString('hex')
    const randomU256: BigNumberish = BigInt('0x' + hexString) % MaxUint256

    return randomU256
}

export default function commitSolutionHash({ onCommit, onBack }: commitSolutionHashProps) {
    const [secretWord, setSecretWord] = useState('')
    const [salt, setSalt] = useState<Uint256>(() => uint256.bnToUint256(randomBigInt()))
    const [isCommitting, setIsCommitting] = useState(false)
    const { toast } = useToast()
    const { gameId } = useGameStore()
    const { setGameData } = useGameStorage('game-data')
    const dict = useDictionary()

    const { commitSolutionHash } = useSystemCalls()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const trimmedWord = secretWord.trim().toUpperCase()

        // Validation
        if (trimmedWord.length !== 4) {
            return toast({
                title: 'Invalid word',
                description: 'Your secret word must be exactly 4 letters long.',
                variant: 'destructive'
            })
        }

        if (!dict.hasWord(trimmedWord)) {
            toast({
                title: 'Invalid word',
                description:
                    'Your secret word must contain unique letters and be in the dictionary.',
                variant: 'destructive'
            })

            return
        }

        const solutionArray = trimmedWord.split('').map(letter => letter.charCodeAt(0))
        const encodedSolution =
            solutionArray[0] +
            solutionArray[1] * 256 +
            solutionArray[2] * 256 * 256 +
            solutionArray[3] * 256 * 256 * 256

        setIsCommitting(true)

        try {
            await initGaraga()

            const solutionHash = poseidonHashBN254(
                BigInt(encodedSolution),
                uint256.uint256ToBN(salt)
            )

            if (!solutionHash) {
                throw new Error('Solution hash generation failed')
            }

            await commitSolutionHash(Number(gameId), BigInt(solutionHash))

            if (gameId !== undefined) {
                setGameData({
                    solution: solutionArray,
                    salt: uint256.uint256ToBN(salt).toString(),
                    gameId: Number(gameId)
                })
            }

            toast({
                title: 'Secret word committed',
                description: 'Your secret word has been successfully committed.'
            })

            onCommit()
        } catch (error) {
            toast({
                title: 'Commit failed',
                description: error.message
                    ? error.message
                    : error || 'Something went wrong during the commit. Please try again.',
                variant: 'destructive'
            })
        } finally {
            setIsCommitting(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Card className={'w-full w-full max-w-md'}>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Set Your Secret Word</CardTitle>
                    <CardDescription className="text-center">
                        Choose a 4-letter word with unique letters that your opponent will try to
                        guess
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <div className="w-full flex justify-between">
                                <h2 className="card-title">Salt</h2>
                                <div className="card-actions">
                                    <Button type="button" variant="link" size={'icon'}>
                                        <ReloadIcon
                                            onClick={() =>
                                                setSalt(uint256.bnToUint256(randomBigInt()))
                                            }
                                        />
                                    </Button>
                                </div>
                            </div>
                            <p className="w-full break-words">{uint256.uint256ToBN(salt)}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm font-medium">Secret Word (4 letters)</div>
                            <Input
                                placeholder="Enter your secret word"
                                value={secretWord}
                                onChange={e => setSecretWord(e.target.value.toUpperCase())}
                                className="font-mono text-center text-lg uppercase"
                                maxLength={4}
                            />
                            <div className="flex items-start text-xs text-slate-500 dark:text-slate-400">
                                <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                                <span>
                                    Your word must have 4 unique letters (no repeats). This word
                                    will be hidden from your opponent until the game ends.
                                </span>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            size={'lg'}
                            disabled={isCommitting}
                        >
                            {isCommitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            {isCommitting ? 'Committing...' : 'Commit Secret Word'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant="ghost" onClick={onBack} size={'lg'} className="w-full">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
