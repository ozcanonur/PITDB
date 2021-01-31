import flatten from 'flat';
import { createRef } from 'react';
import { FixedSizeList } from 'react-window';
import { Transcript, VirtualRef } from '../../types';

export const makeVirtualizedListRefsList = (transcripts: Transcript[]) => {
  const result = transcripts.map(({ cds }) => {
    const baseCase: { exonRef: VirtualRef; cdsRefs?: VirtualRef[][] } = {
      exonRef: createRef<FixedSizeList>(),
    };

    if (!cds) return baseCase;

    baseCase.cdsRefs = cds.map((e) => {
      const baseCase = [createRef<FixedSizeList>()];

      if (e.peptides) baseCase.push(createRef<FixedSizeList>());

      return baseCase;
    });

    return baseCase;
  });

  return result;
};

export const scrollVirtualRefs = (
  scrollLeft: number,
  virtualizedListRefsList: {
    exonRef: VirtualRef;
    cdsRefs?: VirtualRef[][] | undefined;
  }[]
) => {
  const flattenedRefs: any = virtualizedListRefsList
    .map((e) => Object.values(flatten(e, { maxDepth: 1 })))
    .flat();

  // Scroll all the children transcript virtualized lists
  // Won't be scrolled in the cycle between drag and regular scroll
  // Because scrollTo() checks if the element is already at scrollLeft position
  flattenedRefs.forEach((e: VirtualRef | VirtualRef[]) => {
    if (e instanceof Array) {
      const flattened = e.flat();
      flattened.forEach((ref) => {
        if (ref.current) ref.current.scrollTo(scrollLeft);
      });
    } else if (e.current) e.current.scrollTo(scrollLeft);
  });
};
