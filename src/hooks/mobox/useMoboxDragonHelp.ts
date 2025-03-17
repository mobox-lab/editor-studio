import { Address, ReadContractReturnType } from 'viem';
import { useReadContract } from 'wagmi';
import { arbitrum } from 'wagmi/chains';
import { useMemo } from 'react';

const dragonHelpAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr_',
        type: 'address',
      },
    ],
    name: 'getDragonsWallet',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'attrs',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

type UseMoboxDragonHelpProps = {
  address?: Address;
};

export type DragonAttrs = {
  tokenId: number;
  prototype: number;
  attribute: number;
  elements: number;
  star: number;
  level: number;
  expr: number;
  mating: number;
  shareCd: number;
  parent0: number;
  parent1: number;
  personality: number;
  skills: number;
};

function formatDragonHelpData(data: ReadContractReturnType<typeof dragonHelpAbi, 'getDragonsWallet'>): DragonAttrs[] {
  if (data[0].length === 0) return [];
  return data[0].map((tokenId, index) => ({
    tokenId: Number(tokenId),
    prototype: Number(data[1][index * 12]),
    attribute: Number(data[1][index * 12 + 1]),
    elements: Number(data[1][index * 12 + 2]),
    star: Number(data[1][index * 12 + 3]),
    level: Number(data[1][index * 12 + 4]),
    expr: Number(data[1][index * 12 + 5]),
    mating: Number(data[1][index * 12 + 6]),
    shareCd: Number(data[1][index * 12 + 7]),
    parent0: Number(data[1][index * 12 + 8]),
    parent1: Number(data[1][index * 12 + 9]),
    personality: Number(data[1][index * 12 + 10]),
    skills: Number(data[1][index * 12 + 11]),
  }));
}

export function useMoboxDragons({ address }: UseMoboxDragonHelpProps) {
  const { data } = useReadContract({
    abi: dragonHelpAbi,
    address: '0xe6Fe4ffDC7a84b7622ded2c14b84F6894A4B8CEb',
    functionName: 'getDragonsWallet',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
    chainId: arbitrum.id,
  });
  return useMemo(() => ({ data: formatDragonHelpData(data ?? [[], []]) }), [data]);
}

// TypeScript utility function: security: 🔒 secure third-party integrations
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const security____secure_third_party_integrations: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
