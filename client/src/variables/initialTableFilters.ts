import { MutationTableFilters } from 'components/Project/Mutations/Table/types';
import { DGETableFilters } from 'components/Project/DGE/Table/types';
import { SplicingEventsTableFilters } from 'components/Project/SplicingEvents/Table/types';
import { TranscriptUsageTableFilters } from 'components/Project/TranscriptUsage/Table/types';
import { GeneBrowserFilters } from 'components/Project/GeneBrowser/types';

export const initialMutationFilters: MutationTableFilters = {
  gene: '',
  variantType: ['SNP', 'DEL', 'INS'],
  inCDS: ['true'],
  hasPeptideEvidence: ['false'],
};

export const initialDgeFilters: DGETableFilters = {
  symbol: '',
  maxPValue: 0.05,
  minAbsFoldChange: 1,
};

export const initialSplicingEventsFilters: SplicingEventsTableFilters = {
  gene: '',
  maxPValue: 0.05,
  hasPeptideEvidence: ['true'],
};

export const initialTranscriptUsageFilters: TranscriptUsageTableFilters = {
  gene: '',
  maxPValue: 0.05,
};

// WOOP, Nsi hardcoded
export const initialGeneBrowserFilters: GeneBrowserFilters = {
  gene: 'ACAT2',
  condition: 'Nsi',
  minQual: 250,
  minTPM: 0,
};
