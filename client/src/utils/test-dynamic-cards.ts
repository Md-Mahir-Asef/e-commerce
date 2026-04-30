// Test utility to verify dynamic card dimensions
import { useDynamicCardHeight } from "@/hooks/useDynamicCardHeight";

export const testCardDimensions = () => {
  // Test CategoryRow context
  const categoryRowMobile = useDynamicCardHeight({ categoryRow: true });
  const categoryRowDesktop = useDynamicCardHeight({ categoryRow: true });
  
  // Test SearchGrid context
  const searchGridMobile = useDynamicCardHeight({ searchGrid: true });
  const searchGridDesktop = useDynamicCardHeight({ searchGrid: true });
  
  console.log("CategoryRow Mobile:", categoryRowMobile);
  console.log("CategoryRow Desktop:", categoryRowDesktop);
  console.log("SearchGrid Mobile:", searchGridMobile);
  console.log("SearchGrid Desktop:", searchGridDesktop);
  
  return {
    categoryRowMobile,
    categoryRowDesktop,
    searchGridMobile,
    searchGridDesktop,
  };
};
