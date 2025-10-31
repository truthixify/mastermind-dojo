// This file is auto-generated from compiled-abi.json
// Do not edit manually

export const compiledAbi = {
  "abi": [
    {
      "type": "constructor",
      "name": "constructor",
      "inputs": [
        {
          "name": "world_class_hash",
          "type": "core::starknet::class_hash::ClassHash"
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
      "type": "enum",
      "name": "core::option::Option::<core::integer::u32>",
      "variants": [
        {
          "name": "Some",
          "type": "core::integer::u32"
        },
        {
          "name": "None",
          "type": "()"
        }
      ]
    },
    {
      "type": "enum",
      "name": "dojo::meta::introspect::Ty",
      "variants": [
        {
          "name": "Primitive",
          "type": "core::felt252"
        },
        {
          "name": "Struct",
          "type": "dojo::meta::introspect::Struct"
        },
        {
          "name": "Enum",
          "type": "dojo::meta::introspect::Enum"
        },
        {
          "name": "Tuple",
          "type": "core::array::Span::<dojo::meta::introspect::Ty>"
        },
        {
          "name": "Array",
          "type": "core::array::Span::<dojo::meta::introspect::Ty>"
        },
        {
          "name": "ByteArray",
          "type": "()"
        },
        {
          "name": "FixedArray",
          "type": "(core::array::Span::<dojo::meta::introspect::Ty>, core::integer::u32)"
        }
      ]
    },
    {
      "type": "enum",
      "name": "dojo::meta::layout::Layout",
      "variants": [
        {
          "name": "Fixed",
          "type": "core::array::Span::<core::integer::u8>"
        },
        {
          "name": "Struct",
          "type": "core::array::Span::<dojo::meta::layout::FieldLayout>"
        },
        {
          "name": "Tuple",
          "type": "core::array::Span::<dojo::meta::layout::Layout>"
        },
        {
          "name": "Array",
          "type": "core::array::Span::<dojo::meta::layout::Layout>"
        },
        {
          "name": "ByteArray",
          "type": "()"
        },
        {
          "name": "Enum",
          "type": "core::array::Span::<dojo::meta::layout::FieldLayout>"
        },
        {
          "name": "FixedArray",
          "type": "(core::array::Span::<dojo::meta::layout::Layout>, core::integer::u32)"
        }
      ]
    },
    {
      "type": "enum",
      "name": "dojo::model::definition::ModelIndex",
      "variants": [
        {
          "name": "Keys",
          "type": "core::array::Span::<core::felt252>"
        },
        {
          "name": "Id",
          "type": "core::felt252"
        },
        {
          "name": "MemberId",
          "type": "(core::felt252, core::felt252)"
        }
      ]
    },
    {
      "type": "enum",
      "name": "dojo::world::resource::Resource",
      "variants": [
        {
          "name": "Model",
          "type": "(core::starknet::contract_address::ContractAddress, core::felt252)"
        },
        {
          "name": "Event",
          "type": "(core::starknet::contract_address::ContractAddress, core::felt252)"
        },
        {
          "name": "Contract",
          "type": "(core::starknet::contract_address::ContractAddress, core::felt252)"
        },
        {
          "name": "Namespace",
          "type": "core::byte_array::ByteArray"
        },
        {
          "name": "World",
          "type": "()"
        },
        {
          "name": "Unregistered",
          "type": "()"
        },
        {
          "name": "Library",
          "type": "(core::starknet::class_hash::ClassHash, core::felt252)"
        },
        {
          "name": "ExternalContract",
          "type": "(core::starknet::contract_address::ContractAddress, core::felt252)"
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
      "name": "dojo::contract::components::world_provider::world_provider_cpt::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::ContractInitialized",
      "kind": "struct",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "init_calldata",
          "type": "core::array::Span::<core::felt252>",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::ContractRegistered",
      "kind": "struct",
      "members": [
        {
          "name": "name",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "namespace",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        },
        {
          "name": "salt",
          "type": "core::felt252",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::ContractUpgraded",
      "kind": "struct",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "WorldSpawned",
          "type": "dojo::world::world_contract::world::WorldSpawned",
          "kind": "nested"
        },
        {
          "name": "WorldUpgraded",
          "type": "dojo::world::world_contract::world::WorldUpgraded",
          "kind": "nested"
        },
        {
          "name": "NamespaceRegistered",
          "type": "dojo::world::world_contract::world::NamespaceRegistered",
          "kind": "nested"
        },
        {
          "name": "ModelRegistered",
          "type": "dojo::world::world_contract::world::ModelRegistered",
          "kind": "nested"
        },
        {
          "name": "EventRegistered",
          "type": "dojo::world::world_contract::world::EventRegistered",
          "kind": "nested"
        },
        {
          "name": "ContractRegistered",
          "type": "dojo::world::world_contract::world::ContractRegistered",
          "kind": "nested"
        },
        {
          "name": "ExternalContractRegistered",
          "type": "dojo::world::world_contract::world::ExternalContractRegistered",
          "kind": "nested"
        },
        {
          "name": "ExternalContractUpgraded",
          "type": "dojo::world::world_contract::world::ExternalContractUpgraded",
          "kind": "nested"
        },
        {
          "name": "ModelUpgraded",
          "type": "dojo::world::world_contract::world::ModelUpgraded",
          "kind": "nested"
        },
        {
          "name": "EventUpgraded",
          "type": "dojo::world::world_contract::world::EventUpgraded",
          "kind": "nested"
        },
        {
          "name": "ContractUpgraded",
          "type": "dojo::world::world_contract::world::ContractUpgraded",
          "kind": "nested"
        },
        {
          "name": "ContractInitialized",
          "type": "dojo::world::world_contract::world::ContractInitialized",
          "kind": "nested"
        },
        {
          "name": "LibraryRegistered",
          "type": "dojo::world::world_contract::world::LibraryRegistered",
          "kind": "nested"
        },
        {
          "name": "EventEmitted",
          "type": "dojo::world::world_contract::world::EventEmitted",
          "kind": "nested"
        },
        {
          "name": "MetadataUpdate",
          "type": "dojo::world::world_contract::world::MetadataUpdate",
          "kind": "nested"
        },
        {
          "name": "StoreSetRecord",
          "type": "dojo::world::world_contract::world::StoreSetRecord",
          "kind": "nested"
        },
        {
          "name": "StoreUpdateRecord",
          "type": "dojo::world::world_contract::world::StoreUpdateRecord",
          "kind": "nested"
        },
        {
          "name": "StoreUpdateMember",
          "type": "dojo::world::world_contract::world::StoreUpdateMember",
          "kind": "nested"
        },
        {
          "name": "StoreDelRecord",
          "type": "dojo::world::world_contract::world::StoreDelRecord",
          "kind": "nested"
        },
        {
          "name": "WriterUpdated",
          "type": "dojo::world::world_contract::world::WriterUpdated",
          "kind": "nested"
        },
        {
          "name": "OwnerUpdated",
          "type": "dojo::world::world_contract::world::OwnerUpdated",
          "kind": "nested"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::EventEmitted",
      "kind": "struct",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "system_address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "keys",
          "type": "core::array::Span::<core::felt252>",
          "kind": "data"
        },
        {
          "name": "values",
          "type": "core::array::Span::<core::felt252>",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::EventRegistered",
      "kind": "struct",
      "members": [
        {
          "name": "name",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "namespace",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        },
        {
          "name": "address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::EventUpgraded",
      "kind": "struct",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        },
        {
          "name": "address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "prev_address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::ExternalContractRegistered",
      "kind": "struct",
      "members": [
        {
          "name": "namespace",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "contract_name",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "instance_name",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "contract_selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        },
        {
          "name": "contract_address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "block_number",
          "type": "core::integer::u64",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::ExternalContractUpgraded",
      "kind": "struct",
      "members": [
        {
          "name": "namespace",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "instance_name",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "contract_selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        },
        {
          "name": "contract_address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "block_number",
          "type": "core::integer::u64",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::LibraryRegistered",
      "kind": "struct",
      "members": [
        {
          "name": "name",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "namespace",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::MetadataUpdate",
      "kind": "struct",
      "members": [
        {
          "name": "resource",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "uri",
          "type": "core::byte_array::ByteArray",
          "kind": "data"
        },
        {
          "name": "hash",
          "type": "core::felt252",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::ModelRegistered",
      "kind": "struct",
      "members": [
        {
          "name": "name",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "namespace",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        },
        {
          "name": "address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::ModelUpgraded",
      "kind": "struct",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        },
        {
          "name": "address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "prev_address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::NamespaceRegistered",
      "kind": "struct",
      "members": [
        {
          "name": "namespace",
          "type": "core::byte_array::ByteArray",
          "kind": "key"
        },
        {
          "name": "hash",
          "type": "core::felt252",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::OwnerUpdated",
      "kind": "struct",
      "members": [
        {
          "name": "resource",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "contract",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "value",
          "type": "core::bool",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::StoreDelRecord",
      "kind": "struct",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "entity_id",
          "type": "core::felt252",
          "kind": "key"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::StoreSetRecord",
      "kind": "struct",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "entity_id",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "keys",
          "type": "core::array::Span::<core::felt252>",
          "kind": "data"
        },
        {
          "name": "values",
          "type": "core::array::Span::<core::felt252>",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::StoreUpdateMember",
      "kind": "struct",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "entity_id",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "member_selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "values",
          "type": "core::array::Span::<core::felt252>",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::StoreUpdateRecord",
      "kind": "struct",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "entity_id",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "values",
          "type": "core::array::Span::<core::felt252>",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::WorldSpawned",
      "kind": "struct",
      "members": [
        {
          "name": "creator",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::world::world_contract::world::WorldUpgraded",
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
      "name": "dojo::world::world_contract::world::WriterUpdated",
      "kind": "struct",
      "members": [
        {
          "name": "resource",
          "type": "core::felt252",
          "kind": "key"
        },
        {
          "name": "contract",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "value",
          "type": "core::bool",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "mastermind::models::m_Game::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::models::m_Guess::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::models::m_HitAndBlow::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::models::m_Mastermind::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::models::m_Player::Event",
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
    },
    {
      "type": "event",
      "name": "mastermind::systems::events::e_CommitSolutionHash::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::systems::events::e_GameFinish::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::systems::events::e_InitializeGame::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::systems::events::e_OpponentJoined::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::systems::events::e_RegisterPlayer::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::systems::events::e_RevealSolution::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::systems::events::e_StageChange::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::systems::events::e_SubmitGuess::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "mastermind::systems::events::e_SubmitHitAndBlow::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "function",
      "name": "dojo_init",
      "inputs": [],
      "outputs": [],
      "state_mutability": "view"
    },
    {
      "type": "function",
      "name": "ensure_abi",
      "inputs": [
        {
          "name": "event",
          "type": "mastermind::systems::events::CommitSolutionHash"
        }
      ],
      "outputs": [],
      "state_mutability": "view"
    },
    {
      "type": "function",
      "name": "ensure_unique",
      "inputs": [],
      "outputs": [],
      "state_mutability": "view"
    },
    {
      "type": "function",
      "name": "ensure_values",
      "inputs": [
        {
          "name": "value",
          "type": "mastermind::systems::events::CommitSolutionHashValue"
        }
      ],
      "outputs": [],
      "state_mutability": "view"
    },
    {
      "type": "impl",
      "name": "actions__ContractImpl",
      "interface_name": "dojo::contract::interface::IContract"
    },
    {
      "type": "impl",
      "name": "CommitSolutionHash__DeployedEventImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "CommitSolutionHash__EventImpl",
      "interface_name": "dojo::event::interface::IEvent"
    },
    {
      "type": "impl",
      "name": "CommitSolutionHash__StoredEventImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "DojoDeployedContractImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "Game__DojoDeployedModelImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "Game__DojoModelImpl",
      "interface_name": "dojo::model::interface::IModel"
    },
    {
      "type": "impl",
      "name": "Game__DojoStoredModelImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "GameFinish__DeployedEventImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "GameFinish__EventImpl",
      "interface_name": "dojo::event::interface::IEvent"
    },
    {
      "type": "impl",
      "name": "GameFinish__StoredEventImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "Guess__DojoDeployedModelImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "Guess__DojoModelImpl",
      "interface_name": "dojo::model::interface::IModel"
    },
    {
      "type": "impl",
      "name": "Guess__DojoStoredModelImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "HitAndBlow__DojoDeployedModelImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "HitAndBlow__DojoModelImpl",
      "interface_name": "dojo::model::interface::IModel"
    },
    {
      "type": "impl",
      "name": "HitAndBlow__DojoStoredModelImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "InitializeGame__DeployedEventImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "InitializeGame__EventImpl",
      "interface_name": "dojo::event::interface::IEvent"
    },
    {
      "type": "impl",
      "name": "InitializeGame__StoredEventImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "Mastermind__DojoDeployedModelImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "Mastermind__DojoModelImpl",
      "interface_name": "dojo::model::interface::IModel"
    },
    {
      "type": "impl",
      "name": "Mastermind__DojoStoredModelImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "MastermindImpl",
      "interface_name": "mastermind::systems::interface::IMastermind"
    },
    {
      "type": "impl",
      "name": "OpponentJoined__DeployedEventImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "OpponentJoined__EventImpl",
      "interface_name": "dojo::event::interface::IEvent"
    },
    {
      "type": "impl",
      "name": "OpponentJoined__StoredEventImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "Player__DojoDeployedModelImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "Player__DojoModelImpl",
      "interface_name": "dojo::model::interface::IModel"
    },
    {
      "type": "impl",
      "name": "Player__DojoStoredModelImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "RegisterPlayer__DeployedEventImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "RegisterPlayer__EventImpl",
      "interface_name": "dojo::event::interface::IEvent"
    },
    {
      "type": "impl",
      "name": "RegisterPlayer__StoredEventImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "RevealSolution__DeployedEventImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "RevealSolution__EventImpl",
      "interface_name": "dojo::event::interface::IEvent"
    },
    {
      "type": "impl",
      "name": "RevealSolution__StoredEventImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "StageChange__DeployedEventImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "StageChange__EventImpl",
      "interface_name": "dojo::event::interface::IEvent"
    },
    {
      "type": "impl",
      "name": "StageChange__StoredEventImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "SubmitGuess__DeployedEventImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "SubmitGuess__EventImpl",
      "interface_name": "dojo::event::interface::IEvent"
    },
    {
      "type": "impl",
      "name": "SubmitGuess__StoredEventImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "SubmitHitAndBlow__DeployedEventImpl",
      "interface_name": "dojo::meta::interface::IDeployedResource"
    },
    {
      "type": "impl",
      "name": "SubmitHitAndBlow__EventImpl",
      "interface_name": "dojo::event::interface::IEvent"
    },
    {
      "type": "impl",
      "name": "SubmitHitAndBlow__StoredEventImpl",
      "interface_name": "dojo::meta::interface::IStoredResource"
    },
    {
      "type": "impl",
      "name": "UpgradeableImpl",
      "interface_name": "dojo::contract::components::upgradeable::IUpgradeable"
    },
    {
      "type": "impl",
      "name": "UpgradeableWorld",
      "interface_name": "dojo::world::iworld::IUpgradeableWorld"
    },
    {
      "type": "impl",
      "name": "World",
      "interface_name": "dojo::world::iworld::IWorld"
    },
    {
      "type": "impl",
      "name": "WorldProviderImpl",
      "interface_name": "dojo::contract::components::world_provider::IWorldProvider"
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
      "type": "interface",
      "name": "dojo::contract::interface::IContract",
      "items": []
    },
    {
      "type": "interface",
      "name": "dojo::event::interface::IEvent",
      "items": [
        {
          "type": "function",
          "name": "definition",
          "inputs": [],
          "outputs": [
            {
              "type": "dojo::event::event::EventDef"
            }
          ],
          "state_mutability": "view"
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
      "type": "interface",
      "name": "dojo::meta::interface::IStoredResource",
      "items": [
        {
          "type": "function",
          "name": "layout",
          "inputs": [],
          "outputs": [
            {
              "type": "dojo::meta::layout::Layout"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "schema",
          "inputs": [],
          "outputs": [
            {
              "type": "dojo::meta::introspect::Struct"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "type": "interface",
      "name": "dojo::model::interface::IModel",
      "items": [
        {
          "type": "function",
          "name": "unpacked_size",
          "inputs": [],
          "outputs": [
            {
              "type": "core::option::Option::<core::integer::u32>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "packed_size",
          "inputs": [],
          "outputs": [
            {
              "type": "core::option::Option::<core::integer::u32>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "definition",
          "inputs": [],
          "outputs": [
            {
              "type": "dojo::model::definition::ModelDef"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "use_legacy_storage",
          "inputs": [],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "type": "interface",
      "name": "dojo::world::iworld::IUpgradeableWorld",
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
      "type": "interface",
      "name": "dojo::world::iworld::IWorld",
      "items": [
        {
          "type": "function",
          "name": "resource",
          "inputs": [
            {
              "name": "selector",
              "type": "core::felt252"
            }
          ],
          "outputs": [
            {
              "type": "dojo::world::resource::Resource"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "uuid",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u32"
            }
          ],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "metadata",
          "inputs": [
            {
              "name": "resource_selector",
              "type": "core::felt252"
            }
          ],
          "outputs": [
            {
              "type": "dojo::model::metadata::ResourceMetadata"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "set_metadata",
          "inputs": [
            {
              "name": "metadata",
              "type": "dojo::model::metadata::ResourceMetadata"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "register_namespace",
          "inputs": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "register_event",
          "inputs": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "register_model",
          "inputs": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "register_contract",
          "inputs": [
            {
              "name": "salt",
              "type": "core::felt252"
            },
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "register_external_contract",
          "inputs": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "contract_name",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "instance_name",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "contract_address",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "block_number",
              "type": "core::integer::u64"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "register_library",
          "inputs": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            },
            {
              "name": "name",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "version",
              "type": "core::byte_array::ByteArray"
            }
          ],
          "outputs": [
            {
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "init_contract",
          "inputs": [
            {
              "name": "selector",
              "type": "core::felt252"
            },
            {
              "name": "init_calldata",
              "type": "core::array::Span::<core::felt252>"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "upgrade_event",
          "inputs": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "upgrade_model",
          "inputs": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "upgrade_contract",
          "inputs": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [
            {
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "upgrade_external_contract",
          "inputs": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "instance_name",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "contract_address",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "block_number",
              "type": "core::integer::u64"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "emit_event",
          "inputs": [
            {
              "name": "event_selector",
              "type": "core::felt252"
            },
            {
              "name": "keys",
              "type": "core::array::Span::<core::felt252>"
            },
            {
              "name": "values",
              "type": "core::array::Span::<core::felt252>"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "emit_events",
          "inputs": [
            {
              "name": "event_selector",
              "type": "core::felt252"
            },
            {
              "name": "keys",
              "type": "core::array::Span::<core::array::Span::<core::felt252>>"
            },
            {
              "name": "values",
              "type": "core::array::Span::<core::array::Span::<core::felt252>>"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "entity",
          "inputs": [
            {
              "name": "model_selector",
              "type": "core::felt252"
            },
            {
              "name": "index",
              "type": "dojo::model::definition::ModelIndex"
            },
            {
              "name": "layout",
              "type": "dojo::meta::layout::Layout"
            }
          ],
          "outputs": [
            {
              "type": "core::array::Span::<core::felt252>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "entities",
          "inputs": [
            {
              "name": "model_selector",
              "type": "core::felt252"
            },
            {
              "name": "indexes",
              "type": "core::array::Span::<dojo::model::definition::ModelIndex>"
            },
            {
              "name": "layout",
              "type": "dojo::meta::layout::Layout"
            }
          ],
          "outputs": [
            {
              "type": "core::array::Span::<core::array::Span::<core::felt252>>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "set_entity",
          "inputs": [
            {
              "name": "model_selector",
              "type": "core::felt252"
            },
            {
              "name": "index",
              "type": "dojo::model::definition::ModelIndex"
            },
            {
              "name": "values",
              "type": "core::array::Span::<core::felt252>"
            },
            {
              "name": "layout",
              "type": "dojo::meta::layout::Layout"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "set_entities",
          "inputs": [
            {
              "name": "model_selector",
              "type": "core::felt252"
            },
            {
              "name": "indexes",
              "type": "core::array::Span::<dojo::model::definition::ModelIndex>"
            },
            {
              "name": "values",
              "type": "core::array::Span::<core::array::Span::<core::felt252>>"
            },
            {
              "name": "layout",
              "type": "dojo::meta::layout::Layout"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "delete_entity",
          "inputs": [
            {
              "name": "model_selector",
              "type": "core::felt252"
            },
            {
              "name": "index",
              "type": "dojo::model::definition::ModelIndex"
            },
            {
              "name": "layout",
              "type": "dojo::meta::layout::Layout"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "delete_entities",
          "inputs": [
            {
              "name": "model_selector",
              "type": "core::felt252"
            },
            {
              "name": "indexes",
              "type": "core::array::Span::<dojo::model::definition::ModelIndex>"
            },
            {
              "name": "layout",
              "type": "dojo::meta::layout::Layout"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "is_owner",
          "inputs": [
            {
              "name": "resource",
              "type": "core::felt252"
            },
            {
              "name": "address",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "grant_owner",
          "inputs": [
            {
              "name": "resource",
              "type": "core::felt252"
            },
            {
              "name": "address",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "revoke_owner",
          "inputs": [
            {
              "name": "resource",
              "type": "core::felt252"
            },
            {
              "name": "address",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "owners_count",
          "inputs": [
            {
              "name": "resource",
              "type": "core::felt252"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u64"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "is_writer",
          "inputs": [
            {
              "name": "resource",
              "type": "core::felt252"
            },
            {
              "name": "contract",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "grant_writer",
          "inputs": [
            {
              "name": "resource",
              "type": "core::felt252"
            },
            {
              "name": "contract",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "revoke_writer",
          "inputs": [
            {
              "name": "resource",
              "type": "core::felt252"
            },
            {
              "name": "contract",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
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
      "type": "struct",
      "name": "core::array::Span::<(core::felt252, dojo::meta::introspect::Ty)>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<(core::felt252, dojo::meta::introspect::Ty)>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::array::Span::<core::array::Span::<core::felt252>>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
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
      "type": "struct",
      "name": "core::array::Span::<core::integer::u8>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<core::integer::u8>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::array::Span::<dojo::meta::introspect::Member>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<dojo::meta::introspect::Member>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::array::Span::<dojo::meta::introspect::Ty>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<dojo::meta::introspect::Ty>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::array::Span::<dojo::meta::layout::FieldLayout>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<dojo::meta::layout::FieldLayout>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::array::Span::<dojo::meta::layout::Layout>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<dojo::meta::layout::Layout>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::array::Span::<dojo::model::definition::ModelIndex>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<dojo::model::definition::ModelIndex>"
        }
      ]
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
      "name": "dojo::event::event::EventDef",
      "members": [
        {
          "name": "name",
          "type": "core::byte_array::ByteArray"
        },
        {
          "name": "layout",
          "type": "dojo::meta::layout::Layout"
        },
        {
          "name": "schema",
          "type": "dojo::meta::introspect::Struct"
        }
      ]
    },
    {
      "type": "struct",
      "name": "dojo::meta::introspect::Enum",
      "members": [
        {
          "name": "name",
          "type": "core::felt252"
        },
        {
          "name": "attrs",
          "type": "core::array::Span::<core::felt252>"
        },
        {
          "name": "children",
          "type": "core::array::Span::<(core::felt252, dojo::meta::introspect::Ty)>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "dojo::meta::introspect::Member",
      "members": [
        {
          "name": "name",
          "type": "core::felt252"
        },
        {
          "name": "attrs",
          "type": "core::array::Span::<core::felt252>"
        },
        {
          "name": "ty",
          "type": "dojo::meta::introspect::Ty"
        }
      ]
    },
    {
      "type": "struct",
      "name": "dojo::meta::introspect::Struct",
      "members": [
        {
          "name": "name",
          "type": "core::felt252"
        },
        {
          "name": "attrs",
          "type": "core::array::Span::<core::felt252>"
        },
        {
          "name": "children",
          "type": "core::array::Span::<dojo::meta::introspect::Member>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "dojo::meta::layout::FieldLayout",
      "members": [
        {
          "name": "selector",
          "type": "core::felt252"
        },
        {
          "name": "layout",
          "type": "dojo::meta::layout::Layout"
        }
      ]
    },
    {
      "type": "struct",
      "name": "dojo::model::definition::ModelDef",
      "members": [
        {
          "name": "name",
          "type": "core::byte_array::ByteArray"
        },
        {
          "name": "layout",
          "type": "dojo::meta::layout::Layout"
        },
        {
          "name": "schema",
          "type": "dojo::meta::introspect::Struct"
        },
        {
          "name": "packed_size",
          "type": "core::option::Option::<core::integer::u32>"
        },
        {
          "name": "unpacked_size",
          "type": "core::option::Option::<core::integer::u32>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "dojo::model::metadata::ResourceMetadata",
      "members": [
        {
          "name": "resource_id",
          "type": "core::felt252"
        },
        {
          "name": "metadata_uri",
          "type": "core::byte_array::ByteArray"
        },
        {
          "name": "metadata_hash",
          "type": "core::felt252"
        }
      ]
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
      "type": "struct",
      "name": "mastermind::models::Game",
      "members": [
        {
          "name": "id",
          "type": "core::integer::u32"
        },
        {
          "name": "creator",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "opponent",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "stage",
          "type": "mastermind::systems::enums::Stages"
        },
        {
          "name": "game_result",
          "type": "mastermind::systems::enums::GameResult"
        },
        {
          "name": "current_round",
          "type": "core::integer::u8"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::models::GameValue",
      "members": [
        {
          "name": "creator",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "opponent",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "stage",
          "type": "mastermind::systems::enums::Stages"
        },
        {
          "name": "game_result",
          "type": "mastermind::systems::enums::GameResult"
        },
        {
          "name": "current_round",
          "type": "core::integer::u8"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::models::Guess",
      "members": [
        {
          "name": "id",
          "type": "core::integer::u32"
        },
        {
          "name": "player_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "guess",
          "type": "core::array::Array::<(core::integer::u8, core::integer::u8, core::integer::u8, core::integer::u8)>"
        },
        {
          "name": "submitted",
          "type": "core::array::Array::<core::bool>"
        },
        {
          "name": "solution_hash",
          "type": "core::integer::u256"
        },
        {
          "name": "guess_index",
          "type": "core::integer::u64"
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
      "name": "mastermind::models::GuessValue",
      "members": [
        {
          "name": "guess",
          "type": "core::array::Array::<(core::integer::u8, core::integer::u8, core::integer::u8, core::integer::u8)>"
        },
        {
          "name": "submitted",
          "type": "core::array::Array::<core::bool>"
        },
        {
          "name": "solution_hash",
          "type": "core::integer::u256"
        },
        {
          "name": "guess_index",
          "type": "core::integer::u64"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::models::HitAndBlow",
      "members": [
        {
          "name": "game_id",
          "type": "core::integer::u32"
        },
        {
          "name": "player_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "hit_and_blow",
          "type": "core::array::Array::<(core::integer::u8, core::integer::u8, core::bool)>"
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
      "type": "struct",
      "name": "mastermind::models::HitAndBlowValue",
      "members": [
        {
          "name": "hit_and_blow",
          "type": "core::array::Array::<(core::integer::u8, core::integer::u8, core::bool)>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::models::Mastermind",
      "members": [
        {
          "name": "id",
          "type": "core::felt252"
        },
        {
          "name": "player_count",
          "type": "core::integer::u32"
        },
        {
          "name": "game_count",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::models::MastermindValue",
      "members": [
        {
          "name": "player_count",
          "type": "core::integer::u32"
        },
        {
          "name": "game_count",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::models::Player",
      "members": [
        {
          "name": "address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "player_id",
          "type": "core::integer::u32"
        },
        {
          "name": "player_name",
          "type": "core::felt252"
        },
        {
          "name": "player_game_ids",
          "type": "core::array::Array::<core::integer::u32>"
        },
        {
          "name": "games_won",
          "type": "core::integer::u32"
        },
        {
          "name": "games_lost",
          "type": "core::integer::u32"
        },
        {
          "name": "games_tied",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::models::PlayerValue",
      "members": [
        {
          "name": "player_id",
          "type": "core::integer::u32"
        },
        {
          "name": "player_name",
          "type": "core::felt252"
        },
        {
          "name": "player_game_ids",
          "type": "core::array::Array::<core::integer::u32>"
        },
        {
          "name": "games_won",
          "type": "core::integer::u32"
        },
        {
          "name": "games_lost",
          "type": "core::integer::u32"
        },
        {
          "name": "games_tied",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::CommitSolutionHash",
      "members": [
        {
          "name": "account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "solution_hash",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::CommitSolutionHashValue",
      "members": [
        {
          "name": "solution_hash",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::GameFinish",
      "members": [
        {
          "name": "game_id",
          "type": "core::integer::u32"
        },
        {
          "name": "game_result",
          "type": "mastermind::systems::enums::GameResult"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::GameFinishValue",
      "members": [
        {
          "name": "game_result",
          "type": "mastermind::systems::enums::GameResult"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::InitializeGame",
      "members": [
        {
          "name": "account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "game_id",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::InitializeGameValue",
      "members": [
        {
          "name": "game_id",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::OpponentJoined",
      "members": [
        {
          "name": "account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "game_id",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::OpponentJoinedValue",
      "members": [
        {
          "name": "game_id",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::RegisterPlayer",
      "members": [
        {
          "name": "account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "player_id",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::RegisterPlayerValue",
      "members": [
        {
          "name": "player_id",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::RevealSolution",
      "members": [
        {
          "name": "account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "game_id",
          "type": "core::integer::u32"
        },
        {
          "name": "solution",
          "type": "core::array::Array::<core::integer::u8>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::RevealSolutionValue",
      "members": [
        {
          "name": "solution",
          "type": "core::array::Array::<core::integer::u8>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::StageChange",
      "members": [
        {
          "name": "game_id",
          "type": "core::integer::u32"
        },
        {
          "name": "stage",
          "type": "mastermind::systems::enums::Stages"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::StageChangeValue",
      "members": [
        {
          "name": "stage",
          "type": "mastermind::systems::enums::Stages"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::SubmitGuess",
      "members": [
        {
          "name": "account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "current_round",
          "type": "core::integer::u8"
        },
        {
          "name": "guess",
          "type": "core::array::Array::<core::integer::u8>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::SubmitGuessValue",
      "members": [
        {
          "name": "current_round",
          "type": "core::integer::u8"
        },
        {
          "name": "guess",
          "type": "core::array::Array::<core::integer::u8>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::SubmitHitAndBlow",
      "members": [
        {
          "name": "account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "current_round",
          "type": "core::integer::u8"
        },
        {
          "name": "hit",
          "type": "core::integer::u8"
        },
        {
          "name": "blow",
          "type": "core::integer::u8"
        }
      ]
    },
    {
      "type": "struct",
      "name": "mastermind::systems::events::SubmitHitAndBlowValue",
      "members": [
        {
          "name": "current_round",
          "type": "core::integer::u8"
        },
        {
          "name": "hit",
          "type": "core::integer::u8"
        },
        {
          "name": "blow",
          "type": "core::integer::u8"
        }
      ]
    }
  ],
  "manifest": {
    "world": {
      "class_hash": "0x57994b6a75fad550ca18b41ee82e2110e158c59028c4478109a67965a0e5b1e",
      "address": "0x1a3e1d4ab68095d0a70ae2a210d06ab7f7276d4cfbff6b8eadd3e99c256c017",
      "seed": "mastermind",
      "name": "mastermind",
      "entrypoints": [
        "uuid",
        "set_metadata",
        "register_namespace",
        "register_event",
        "register_model",
        "register_contract",
        "register_external_contract",
        "register_library",
        "init_contract",
        "upgrade_event",
        "upgrade_model",
        "upgrade_contract",
        "upgrade_external_contract",
        "emit_event",
        "emit_events",
        "set_entity",
        "set_entities",
        "delete_entity",
        "delete_entities",
        "grant_owner",
        "revoke_owner",
        "grant_writer",
        "revoke_writer",
        "upgrade"
      ],
      "abi": [
        {
          "type": "impl",
          "name": "World",
          "interface_name": "dojo::world::iworld::IWorld"
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
          "type": "enum",
          "name": "dojo::world::resource::Resource",
          "variants": [
            {
              "name": "Model",
              "type": "(core::starknet::contract_address::ContractAddress, core::felt252)"
            },
            {
              "name": "Event",
              "type": "(core::starknet::contract_address::ContractAddress, core::felt252)"
            },
            {
              "name": "Contract",
              "type": "(core::starknet::contract_address::ContractAddress, core::felt252)"
            },
            {
              "name": "Namespace",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "World",
              "type": "()"
            },
            {
              "name": "Unregistered",
              "type": "()"
            },
            {
              "name": "Library",
              "type": "(core::starknet::class_hash::ClassHash, core::felt252)"
            },
            {
              "name": "ExternalContract",
              "type": "(core::starknet::contract_address::ContractAddress, core::felt252)"
            }
          ]
        },
        {
          "type": "struct",
          "name": "dojo::model::metadata::ResourceMetadata",
          "members": [
            {
              "name": "resource_id",
              "type": "core::felt252"
            },
            {
              "name": "metadata_uri",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "metadata_hash",
              "type": "core::felt252"
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
          "type": "struct",
          "name": "core::array::Span::<core::array::Span::<core::felt252>>",
          "members": [
            {
              "name": "snapshot",
              "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
            }
          ]
        },
        {
          "type": "enum",
          "name": "dojo::model::definition::ModelIndex",
          "variants": [
            {
              "name": "Keys",
              "type": "core::array::Span::<core::felt252>"
            },
            {
              "name": "Id",
              "type": "core::felt252"
            },
            {
              "name": "MemberId",
              "type": "(core::felt252, core::felt252)"
            }
          ]
        },
        {
          "type": "struct",
          "name": "core::array::Span::<core::integer::u8>",
          "members": [
            {
              "name": "snapshot",
              "type": "@core::array::Array::<core::integer::u8>"
            }
          ]
        },
        {
          "type": "struct",
          "name": "dojo::meta::layout::FieldLayout",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252"
            },
            {
              "name": "layout",
              "type": "dojo::meta::layout::Layout"
            }
          ]
        },
        {
          "type": "struct",
          "name": "core::array::Span::<dojo::meta::layout::FieldLayout>",
          "members": [
            {
              "name": "snapshot",
              "type": "@core::array::Array::<dojo::meta::layout::FieldLayout>"
            }
          ]
        },
        {
          "type": "struct",
          "name": "core::array::Span::<dojo::meta::layout::Layout>",
          "members": [
            {
              "name": "snapshot",
              "type": "@core::array::Array::<dojo::meta::layout::Layout>"
            }
          ]
        },
        {
          "type": "enum",
          "name": "dojo::meta::layout::Layout",
          "variants": [
            {
              "name": "Fixed",
              "type": "core::array::Span::<core::integer::u8>"
            },
            {
              "name": "Struct",
              "type": "core::array::Span::<dojo::meta::layout::FieldLayout>"
            },
            {
              "name": "Tuple",
              "type": "core::array::Span::<dojo::meta::layout::Layout>"
            },
            {
              "name": "Array",
              "type": "core::array::Span::<dojo::meta::layout::Layout>"
            },
            {
              "name": "ByteArray",
              "type": "()"
            },
            {
              "name": "Enum",
              "type": "core::array::Span::<dojo::meta::layout::FieldLayout>"
            },
            {
              "name": "FixedArray",
              "type": "(core::array::Span::<dojo::meta::layout::Layout>, core::integer::u32)"
            }
          ]
        },
        {
          "type": "struct",
          "name": "core::array::Span::<dojo::model::definition::ModelIndex>",
          "members": [
            {
              "name": "snapshot",
              "type": "@core::array::Array::<dojo::model::definition::ModelIndex>"
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
          "type": "interface",
          "name": "dojo::world::iworld::IWorld",
          "items": [
            {
              "type": "function",
              "name": "resource",
              "inputs": [
                {
                  "name": "selector",
                  "type": "core::felt252"
                }
              ],
              "outputs": [
                {
                  "type": "dojo::world::resource::Resource"
                }
              ],
              "state_mutability": "view"
            },
            {
              "type": "function",
              "name": "uuid",
              "inputs": [],
              "outputs": [
                {
                  "type": "core::integer::u32"
                }
              ],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "metadata",
              "inputs": [
                {
                  "name": "resource_selector",
                  "type": "core::felt252"
                }
              ],
              "outputs": [
                {
                  "type": "dojo::model::metadata::ResourceMetadata"
                }
              ],
              "state_mutability": "view"
            },
            {
              "type": "function",
              "name": "set_metadata",
              "inputs": [
                {
                  "name": "metadata",
                  "type": "dojo::model::metadata::ResourceMetadata"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "register_namespace",
              "inputs": [
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "register_event",
              "inputs": [
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "class_hash",
                  "type": "core::starknet::class_hash::ClassHash"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "register_model",
              "inputs": [
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "class_hash",
                  "type": "core::starknet::class_hash::ClassHash"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "register_contract",
              "inputs": [
                {
                  "name": "salt",
                  "type": "core::felt252"
                },
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "class_hash",
                  "type": "core::starknet::class_hash::ClassHash"
                }
              ],
              "outputs": [
                {
                  "type": "core::starknet::contract_address::ContractAddress"
                }
              ],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "register_external_contract",
              "inputs": [
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "contract_name",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "instance_name",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "contract_address",
                  "type": "core::starknet::contract_address::ContractAddress"
                },
                {
                  "name": "block_number",
                  "type": "core::integer::u64"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "register_library",
              "inputs": [
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "class_hash",
                  "type": "core::starknet::class_hash::ClassHash"
                },
                {
                  "name": "name",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "version",
                  "type": "core::byte_array::ByteArray"
                }
              ],
              "outputs": [
                {
                  "type": "core::starknet::class_hash::ClassHash"
                }
              ],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "init_contract",
              "inputs": [
                {
                  "name": "selector",
                  "type": "core::felt252"
                },
                {
                  "name": "init_calldata",
                  "type": "core::array::Span::<core::felt252>"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "upgrade_event",
              "inputs": [
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "class_hash",
                  "type": "core::starknet::class_hash::ClassHash"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "upgrade_model",
              "inputs": [
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "class_hash",
                  "type": "core::starknet::class_hash::ClassHash"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "upgrade_contract",
              "inputs": [
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "class_hash",
                  "type": "core::starknet::class_hash::ClassHash"
                }
              ],
              "outputs": [
                {
                  "type": "core::starknet::class_hash::ClassHash"
                }
              ],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "upgrade_external_contract",
              "inputs": [
                {
                  "name": "namespace",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "instance_name",
                  "type": "core::byte_array::ByteArray"
                },
                {
                  "name": "contract_address",
                  "type": "core::starknet::contract_address::ContractAddress"
                },
                {
                  "name": "block_number",
                  "type": "core::integer::u64"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "emit_event",
              "inputs": [
                {
                  "name": "event_selector",
                  "type": "core::felt252"
                },
                {
                  "name": "keys",
                  "type": "core::array::Span::<core::felt252>"
                },
                {
                  "name": "values",
                  "type": "core::array::Span::<core::felt252>"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "emit_events",
              "inputs": [
                {
                  "name": "event_selector",
                  "type": "core::felt252"
                },
                {
                  "name": "keys",
                  "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                },
                {
                  "name": "values",
                  "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "entity",
              "inputs": [
                {
                  "name": "model_selector",
                  "type": "core::felt252"
                },
                {
                  "name": "index",
                  "type": "dojo::model::definition::ModelIndex"
                },
                {
                  "name": "layout",
                  "type": "dojo::meta::layout::Layout"
                }
              ],
              "outputs": [
                {
                  "type": "core::array::Span::<core::felt252>"
                }
              ],
              "state_mutability": "view"
            },
            {
              "type": "function",
              "name": "entities",
              "inputs": [
                {
                  "name": "model_selector",
                  "type": "core::felt252"
                },
                {
                  "name": "indexes",
                  "type": "core::array::Span::<dojo::model::definition::ModelIndex>"
                },
                {
                  "name": "layout",
                  "type": "dojo::meta::layout::Layout"
                }
              ],
              "outputs": [
                {
                  "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                }
              ],
              "state_mutability": "view"
            },
            {
              "type": "function",
              "name": "set_entity",
              "inputs": [
                {
                  "name": "model_selector",
                  "type": "core::felt252"
                },
                {
                  "name": "index",
                  "type": "dojo::model::definition::ModelIndex"
                },
                {
                  "name": "values",
                  "type": "core::array::Span::<core::felt252>"
                },
                {
                  "name": "layout",
                  "type": "dojo::meta::layout::Layout"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "set_entities",
              "inputs": [
                {
                  "name": "model_selector",
                  "type": "core::felt252"
                },
                {
                  "name": "indexes",
                  "type": "core::array::Span::<dojo::model::definition::ModelIndex>"
                },
                {
                  "name": "values",
                  "type": "core::array::Span::<core::array::Span::<core::felt252>>"
                },
                {
                  "name": "layout",
                  "type": "dojo::meta::layout::Layout"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "delete_entity",
              "inputs": [
                {
                  "name": "model_selector",
                  "type": "core::felt252"
                },
                {
                  "name": "index",
                  "type": "dojo::model::definition::ModelIndex"
                },
                {
                  "name": "layout",
                  "type": "dojo::meta::layout::Layout"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "delete_entities",
              "inputs": [
                {
                  "name": "model_selector",
                  "type": "core::felt252"
                },
                {
                  "name": "indexes",
                  "type": "core::array::Span::<dojo::model::definition::ModelIndex>"
                },
                {
                  "name": "layout",
                  "type": "dojo::meta::layout::Layout"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "is_owner",
              "inputs": [
                {
                  "name": "resource",
                  "type": "core::felt252"
                },
                {
                  "name": "address",
                  "type": "core::starknet::contract_address::ContractAddress"
                }
              ],
              "outputs": [
                {
                  "type": "core::bool"
                }
              ],
              "state_mutability": "view"
            },
            {
              "type": "function",
              "name": "grant_owner",
              "inputs": [
                {
                  "name": "resource",
                  "type": "core::felt252"
                },
                {
                  "name": "address",
                  "type": "core::starknet::contract_address::ContractAddress"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "revoke_owner",
              "inputs": [
                {
                  "name": "resource",
                  "type": "core::felt252"
                },
                {
                  "name": "address",
                  "type": "core::starknet::contract_address::ContractAddress"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "owners_count",
              "inputs": [
                {
                  "name": "resource",
                  "type": "core::felt252"
                }
              ],
              "outputs": [
                {
                  "type": "core::integer::u64"
                }
              ],
              "state_mutability": "view"
            },
            {
              "type": "function",
              "name": "is_writer",
              "inputs": [
                {
                  "name": "resource",
                  "type": "core::felt252"
                },
                {
                  "name": "contract",
                  "type": "core::starknet::contract_address::ContractAddress"
                }
              ],
              "outputs": [
                {
                  "type": "core::bool"
                }
              ],
              "state_mutability": "view"
            },
            {
              "type": "function",
              "name": "grant_writer",
              "inputs": [
                {
                  "name": "resource",
                  "type": "core::felt252"
                },
                {
                  "name": "contract",
                  "type": "core::starknet::contract_address::ContractAddress"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            },
            {
              "type": "function",
              "name": "revoke_writer",
              "inputs": [
                {
                  "name": "resource",
                  "type": "core::felt252"
                },
                {
                  "name": "contract",
                  "type": "core::starknet::contract_address::ContractAddress"
                }
              ],
              "outputs": [],
              "state_mutability": "external"
            }
          ]
        },
        {
          "type": "impl",
          "name": "UpgradeableWorld",
          "interface_name": "dojo::world::iworld::IUpgradeableWorld"
        },
        {
          "type": "interface",
          "name": "dojo::world::iworld::IUpgradeableWorld",
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
          "inputs": [
            {
              "name": "world_class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::WorldSpawned",
          "kind": "struct",
          "members": [
            {
              "name": "creator",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::WorldUpgraded",
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
          "name": "dojo::world::world_contract::world::NamespaceRegistered",
          "kind": "struct",
          "members": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "hash",
              "type": "core::felt252",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::ModelRegistered",
          "kind": "struct",
          "members": [
            {
              "name": "name",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            },
            {
              "name": "address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::EventRegistered",
          "kind": "struct",
          "members": [
            {
              "name": "name",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            },
            {
              "name": "address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::ContractRegistered",
          "kind": "struct",
          "members": [
            {
              "name": "name",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            },
            {
              "name": "salt",
              "type": "core::felt252",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::ExternalContractRegistered",
          "kind": "struct",
          "members": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "contract_name",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "instance_name",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "contract_selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            },
            {
              "name": "contract_address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            },
            {
              "name": "block_number",
              "type": "core::integer::u64",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::ExternalContractUpgraded",
          "kind": "struct",
          "members": [
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "instance_name",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "contract_selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            },
            {
              "name": "contract_address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            },
            {
              "name": "block_number",
              "type": "core::integer::u64",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::ModelUpgraded",
          "kind": "struct",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            },
            {
              "name": "address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            },
            {
              "name": "prev_address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::EventUpgraded",
          "kind": "struct",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            },
            {
              "name": "address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            },
            {
              "name": "prev_address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::ContractUpgraded",
          "kind": "struct",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::ContractInitialized",
          "kind": "struct",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "init_calldata",
              "type": "core::array::Span::<core::felt252>",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::LibraryRegistered",
          "kind": "struct",
          "members": [
            {
              "name": "name",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "namespace",
              "type": "core::byte_array::ByteArray",
              "kind": "key"
            },
            {
              "name": "class_hash",
              "type": "core::starknet::class_hash::ClassHash",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::EventEmitted",
          "kind": "struct",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "system_address",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "key"
            },
            {
              "name": "keys",
              "type": "core::array::Span::<core::felt252>",
              "kind": "data"
            },
            {
              "name": "values",
              "type": "core::array::Span::<core::felt252>",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::MetadataUpdate",
          "kind": "struct",
          "members": [
            {
              "name": "resource",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "uri",
              "type": "core::byte_array::ByteArray",
              "kind": "data"
            },
            {
              "name": "hash",
              "type": "core::felt252",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::StoreSetRecord",
          "kind": "struct",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "entity_id",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "keys",
              "type": "core::array::Span::<core::felt252>",
              "kind": "data"
            },
            {
              "name": "values",
              "type": "core::array::Span::<core::felt252>",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::StoreUpdateRecord",
          "kind": "struct",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "entity_id",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "values",
              "type": "core::array::Span::<core::felt252>",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::StoreUpdateMember",
          "kind": "struct",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "entity_id",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "member_selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "values",
              "type": "core::array::Span::<core::felt252>",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::StoreDelRecord",
          "kind": "struct",
          "members": [
            {
              "name": "selector",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "entity_id",
              "type": "core::felt252",
              "kind": "key"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::WriterUpdated",
          "kind": "struct",
          "members": [
            {
              "name": "resource",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "contract",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "key"
            },
            {
              "name": "value",
              "type": "core::bool",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::OwnerUpdated",
          "kind": "struct",
          "members": [
            {
              "name": "resource",
              "type": "core::felt252",
              "kind": "key"
            },
            {
              "name": "contract",
              "type": "core::starknet::contract_address::ContractAddress",
              "kind": "key"
            },
            {
              "name": "value",
              "type": "core::bool",
              "kind": "data"
            }
          ]
        },
        {
          "type": "event",
          "name": "dojo::world::world_contract::world::Event",
          "kind": "enum",
          "variants": [
            {
              "name": "WorldSpawned",
              "type": "dojo::world::world_contract::world::WorldSpawned",
              "kind": "nested"
            },
            {
              "name": "WorldUpgraded",
              "type": "dojo::world::world_contract::world::WorldUpgraded",
              "kind": "nested"
            },
            {
              "name": "NamespaceRegistered",
              "type": "dojo::world::world_contract::world::NamespaceRegistered",
              "kind": "nested"
            },
            {
              "name": "ModelRegistered",
              "type": "dojo::world::world_contract::world::ModelRegistered",
              "kind": "nested"
            },
            {
              "name": "EventRegistered",
              "type": "dojo::world::world_contract::world::EventRegistered",
              "kind": "nested"
            },
            {
              "name": "ContractRegistered",
              "type": "dojo::world::world_contract::world::ContractRegistered",
              "kind": "nested"
            },
            {
              "name": "ExternalContractRegistered",
              "type": "dojo::world::world_contract::world::ExternalContractRegistered",
              "kind": "nested"
            },
            {
              "name": "ExternalContractUpgraded",
              "type": "dojo::world::world_contract::world::ExternalContractUpgraded",
              "kind": "nested"
            },
            {
              "name": "ModelUpgraded",
              "type": "dojo::world::world_contract::world::ModelUpgraded",
              "kind": "nested"
            },
            {
              "name": "EventUpgraded",
              "type": "dojo::world::world_contract::world::EventUpgraded",
              "kind": "nested"
            },
            {
              "name": "ContractUpgraded",
              "type": "dojo::world::world_contract::world::ContractUpgraded",
              "kind": "nested"
            },
            {
              "name": "ContractInitialized",
              "type": "dojo::world::world_contract::world::ContractInitialized",
              "kind": "nested"
            },
            {
              "name": "LibraryRegistered",
              "type": "dojo::world::world_contract::world::LibraryRegistered",
              "kind": "nested"
            },
            {
              "name": "EventEmitted",
              "type": "dojo::world::world_contract::world::EventEmitted",
              "kind": "nested"
            },
            {
              "name": "MetadataUpdate",
              "type": "dojo::world::world_contract::world::MetadataUpdate",
              "kind": "nested"
            },
            {
              "name": "StoreSetRecord",
              "type": "dojo::world::world_contract::world::StoreSetRecord",
              "kind": "nested"
            },
            {
              "name": "StoreUpdateRecord",
              "type": "dojo::world::world_contract::world::StoreUpdateRecord",
              "kind": "nested"
            },
            {
              "name": "StoreUpdateMember",
              "type": "dojo::world::world_contract::world::StoreUpdateMember",
              "kind": "nested"
            },
            {
              "name": "StoreDelRecord",
              "type": "dojo::world::world_contract::world::StoreDelRecord",
              "kind": "nested"
            },
            {
              "name": "WriterUpdated",
              "type": "dojo::world::world_contract::world::WriterUpdated",
              "kind": "nested"
            },
            {
              "name": "OwnerUpdated",
              "type": "dojo::world::world_contract::world::OwnerUpdated",
              "kind": "nested"
            }
          ]
        }
      ]
    },
    "contracts": [
      {
        "address": "0x6b9c2bce48af0e219e5e8f609805c7c18358d35934f5f5f53a9af22911ba96a",
        "class_hash": "0x6d1db8aa87cb45068a5ea02a241b8004ab386d2d0260fa7c192a72493c11cbc",
        "abi": [
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
        ],
        "init_calldata": [],
        "tag": "mastermind-actions",
        "selector": "0x40d2dafa3673fa0fcfd4cb6ddef76f0a4b7385917ddc1828e2285449cf0eb9f",
        "systems": [
          "init_game",
          "register_player",
          "join_game",
          "commit_solution_hash",
          "submit_guess",
          "submit_hit_and_blow_proof",
          "reveal_solution",
          "upgrade"
        ]
      }
    ],
    "models": [
      {
        "members": [],
        "class_hash": "0x7f674b9932e9b83bb05278fc7bd95943a35cfdc8bf98b8d76f3ea807aa5c810",
        "tag": "mastermind-Game",
        "selector": "0x679d521c821b4c537fc0d27f736ac868de829aa91cbd445e4410bffe07dda82"
      },
      {
        "members": [],
        "class_hash": "0x17c02b96aa243b631b9141f4ca2d3bcaad0ed8cd24a8f473e3ffe5353a2c3ca",
        "tag": "mastermind-Guess",
        "selector": "0x32a3486c9231287010685ddc6823c7c36aa4ecb09341615d4fcf16e378fb26"
      },
      {
        "members": [],
        "class_hash": "0x7835d7d99cf83a6beafe30bd278174c86ae36f0e96783190a6a92fec648da84",
        "tag": "mastermind-HitAndBlow",
        "selector": "0x59c7d53c4ca2013f59509dabe9bc71de02f3ec6fd3e37595109ede3c437f626"
      },
      {
        "members": [],
        "class_hash": "0x3dbd6545d0abfa43aa5a34c1cc1c458333a0556c9487a1f6bdcbbd25112cc8b",
        "tag": "mastermind-Mastermind",
        "selector": "0x6da4622a7e2b3ee240eebc6cd78cc1548af0f673bdfe0a89e3b7a51981ac1a3"
      },
      {
        "members": [],
        "class_hash": "0x1e7d4d53dba6ef3a5edbbb814f7cf43a85863e43e58fd268e4605935871a024",
        "tag": "mastermind-Player",
        "selector": "0x5f479a5c28762a6f662c4285d8c12f99a3462466c42db8577c203f6d73caef4"
      }
    ]
  }
} as const;

export type CompiledAbi = typeof compiledAbi;
