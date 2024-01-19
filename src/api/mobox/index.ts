import request from '@/api/mobox/request';
import { BoxWallet, DragonGovernInfo, DragonProposal, FetchDragonProposalParams, Response } from '@/api/types';
import { DragonProposalSortField } from '@/constants/enum';
import { Address } from 'viem';

export const fetchBoxWallet = () => request.post<any, Response<BoxWallet>>('/user/symbol/balance', { symbol: 'mobox' });

export const fetchDragonUserBag = (addr?: string) =>
  request.get<any, Response<any>>('https://nft-api.mobox.io/nft/dragon/user/bag', { params: { addr } });

export const fetchDragonGovernInfo = () => request.get<any, Response<DragonGovernInfo>>('/modragonGovern/basicInfo');

export const fetchDragonProposals = ({
  sortField = DragonProposalSortField.ALL,
  page = 1,
  size = 16,
}: FetchDragonProposalParams) =>
  request.get<any, Response<DragonProposal[]>>('/modragonGovern/proposals', {
    params: { sortField, first: size, skip: size * (page - 1) },
  });

export const fetchNumberOfDragonProposals = (address?: Address) =>
  request.get<any, Response<number>>('/modragonGovern/numberOfProposals', {
    params: { userAddress: address },
  });
