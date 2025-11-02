export const ACTUAL_GAME_ABI = [
{
    "type": "impl",
    "name": "actions__ContractImpl",
    "interface_name": "dojo::contract::interface::IContract"
},
{
    "type": "interface",
    "name": "dojo::contract::interface::IContract",
    "items": []
},
{
    "type": "impl",
    "name": "DojoDeployedContractImpl",
    "interface_name": "dojo::meta::interface::IDeployedResource"
},
{
    "type": "struct",
    "name": "core::byte_array::ByteArray",
    "members": [
    {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
    },
    {
        "name": "pending_word",
        "type": "core::felt252"
    },
    {
        "name": "pending_word_len",
        "type": "core::integer::u32"
    }
    ]
},
{
    "type": "interface",
    "name": "dojo::meta::interface::IDeployedResource",
    "items": [
    {
        "type": "function",
        "name": "dojo_name",
        "inputs": [],
        "outputs": [
        {
            "type": "core::byte_array::ByteArray"
        }
        ],
        "state_mutability": "view"
    }
    ]
},
{
    "type": "impl",
    "name": "MastermindImpl",
    "interface_name": "mastermind::systems::interface::IMastermind"
},
{
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
    {
        "name": "low",
        "type": "core::integer::u128"
    },
    {
        "name": "high",
        "type": "core::integer::u128"
    }
    ]
},
{
    "type": "struct",
    "name": "core::array::Span::<core::felt252>",
    "members": [
    {
        "name": "snapshot",
        "type": "@core::array::Array::<core::felt252>"
    }
    ]
},
{
    "type": "enum",
    "name": "core::bool",
    "variants": [
    {
        "name": "False",
        "type": "()"
    },
    {
        "name": "True",
        "type": "()"
    }
    ]
},
{
    "type": "struct",
    "name": "mastermind::models::GuessResponse",
    "members": [
    {
        "name": "g1",
        "type": "core::integer::u8"
    },
    {
        "name": "g2",
        "type": "core::integer::u8"
    },
    {
        "name": "g3",
        "type": "core::integer::u8"
    },
    {
        "name": "g4",
        "type": "core::integer::u8"
    },
    {
        "name": "submitted",
        "type": "core::bool"
    }
    ]
},
{
    "type": "struct",
    "name": "mastermind::models::HitAndBlowResponse",
    "members": [
    {
        "name": "hit",
        "type": "core::integer::u8"
    },
    {
        "name": "blow",
        "type": "core::integer::u8"
    },
    {
        "name": "submitted",
        "type": "core::bool"
    }
    ]
},
{
    "type": "enum",
    "name": "mastermind::systems::enums::GameResult",
    "variants": [
    {
        "name": "Undecided",
        "type": "()"
    },
    {
        "name": "Win",
        "type": "core::starknet::contract_address::ContractAddress"
    },
    {
        "name": "Tie",
        "type": "()"
    }
    ]
},
{
    "type": "enum",
    "name": "mastermind::systems::enums::Stages",
    "variants": [
    {
        "name": "Init",
        "type": "()"
    },
    {
        "name": "CreatorCommitSolutionHash",
        "type": "()"
    },
    {
        "name": "WaitingForOpponent",
        "type": "()"
    },
    {
        "name": "OpponentCommitSolutionHash",
        "type": "()"
    },
    {
        "name": "Playing",
        "type": "()"
    },
    {
        "name": "Reveal",
        "type": "()"
    }
    ]
},
{
    "type": "interface",
    "name": "mastermind::systems::interface::IMastermind",
    "items": [
    {
        "type": "function",
        "name": "init_game",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "type": "function",
        "name": "register_player",
        "inputs": [
        {
            "name": "player_name",
            "type": "core::felt252"
        }
        ],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "type": "function",
        "name": "join_game",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        }
        ],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "type": "function",
        "name": "commit_solution_hash",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        },
        {
            "name": "solution_hash",
            "type": "core::integer::u256"
        }
        ],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "type": "function",
        "name": "submit_guess",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        },
        {
            "name": "guess",
            "type": "core::array::Array::<core::integer::u8>"
        }
        ],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "type": "function",
        "name": "submit_hit_and_blow_proof",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        },
        {
            "name": "full_proof_with_hints",
            "type": "core::array::Span::<core::felt252>"
        }
        ],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "type": "function",
        "name": "reveal_solution",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        },
        {
            "name": "solution",
            "type": "core::array::Array::<core::integer::u8>"
        },
        {
            "name": "salt",
            "type": "core::integer::u256"
        }
        ],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "type": "function",
        "name": "get_player_id",
        "inputs": [
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::integer::u32"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_player_name",
        "inputs": [
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::felt252"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_game_opponent_address",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        }
        ],
        "outputs": [
        {
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_game_creator_address",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        }
        ],
        "outputs": [
        {
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_game_submitted_guesses",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        },
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::array::Array::<mastermind::models::GuessResponse>"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_game_submitted_hit_and_blow",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        },
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::array::Array::<mastermind::models::HitAndBlowResponse>"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_game_result",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        }
        ],
        "outputs": [
        {
            "type": "mastermind::systems::enums::GameResult"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_game_current_stage",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        }
        ],
        "outputs": [
        {
            "type": "mastermind::systems::enums::Stages"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_game_solution_hash",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        },
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::integer::u256"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_game_current_round",
        "inputs": [
        {
            "name": "game_id",
            "type": "core::integer::u32"
        }
        ],
        "outputs": [
        {
            "type": "core::integer::u8"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_total_players_count",
        "inputs": [],
        "outputs": [
        {
            "type": "core::integer::u32"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_total_games_count",
        "inputs": [],
        "outputs": [
        {
            "type": "core::integer::u32"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_player_active_game_ids",
        "inputs": [
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::array::Array::<core::integer::u32>"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_available_game_ids",
        "inputs": [],
        "outputs": [
        {
            "type": "core::array::Array::<core::integer::u32>"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_player_total_games_won",
        "inputs": [
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::integer::u32"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_player_total_games_lost",
        "inputs": [
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::integer::u32"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_player_total_games_tied",
        "inputs": [
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::integer::u32"
        }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_player_total_games_played",
        "inputs": [
        {
            "name": "player_address",
            "type": "core::starknet::contract_address::ContractAddress"
        }
        ],
        "outputs": [
        {
            "type": "core::integer::u32"
        }
        ],
        "state_mutability": "view"
    }
    ]
},
{
    "type": "function",
    "name": "dojo_init",
    "inputs": [],
    "outputs": [],
    "state_mutability": "view"
},
{
    "type": "impl",
    "name": "WorldProviderImpl",
    "interface_name": "dojo::contract::components::world_provider::IWorldProvider"
},
{
    "type": "struct",
    "name": "dojo::world::iworld::IWorldDispatcher",
    "members": [
    {
        "name": "contract_address",
        "type": "core::starknet::contract_address::ContractAddress"
    }
    ]
},
{
    "type": "interface",
    "name": "dojo::contract::components::world_provider::IWorldProvider",
    "items": [
    {
        "type": "function",
        "name": "world_dispatcher",
        "inputs": [],
        "outputs": [
        {
            "type": "dojo::world::iworld::IWorldDispatcher"
        }
        ],
        "state_mutability": "view"
    }
    ]
},
{
    "type": "impl",
    "name": "UpgradeableImpl",
    "interface_name": "dojo::contract::components::upgradeable::IUpgradeable"
},
{
    "type": "interface",
    "name": "dojo::contract::components::upgradeable::IUpgradeable",
    "items": [
    {
        "type": "function",
        "name": "upgrade",
        "inputs": [
        {
            "name": "new_class_hash",
            "type": "core::starknet::class_hash::ClassHash"
        }
        ],
        "outputs": [],
        "state_mutability": "external"
    }
    ]
},
{
    "type": "constructor",
    "name": "constructor",
    "inputs": []
},
{
    "type": "event",
    "name": "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
    "kind": "struct",
    "members": [
    {
        "name": "class_hash",
        "type": "core::starknet::class_hash::ClassHash",
        "kind": "data"
    }
    ]
},
{
    "type": "event",
    "name": "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
    "kind": "enum",
    "variants": [
    {
        "name": "Upgraded",
        "type": "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
        "kind": "nested"
    }
    ]
},
{
    "type": "event",
    "name": "dojo::contract::components::world_provider::world_provider_cpt::Event",
    "kind": "enum",
    "variants": []
},
{
    "type": "event",
    "name": "mastermind::systems::actions::actions::Event",
    "kind": "enum",
    "variants": [
    {
        "name": "UpgradeableEvent",
        "type": "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
        "kind": "nested"
    },
    {
        "name": "WorldProviderEvent",
        "type": "dojo::contract::components::world_provider::world_provider_cpt::Event",
        "kind": "nested"
    }
    ]
}
] as const