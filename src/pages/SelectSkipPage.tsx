import React, { useEffect } from "react";
import { Button, Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { Share2 } from "lucide-react";
import { useSkips } from "../hooks/useSkips";
import { useSkipSelection } from "../hooks/useSkipSelection";
import { useUrlState } from "../hooks/useUrlState";
import { ProgressBar } from "../components/ProgressBar";
import { SkipGrid } from "../components/SkipGrid";
import { SelectionSummary } from "../components/SelectionSummary";

const steps = [
  { id: "postcode", label: "Postcode", completed: true, active: false },
  { id: "waste-type", label: "Waste Type", completed: true, active: false },
  { id: "select-skip", label: "Select Skip", completed: false, active: true },
  {
    id: "permit-check",
    label: "Permit Check",
    completed: false,
    active: false,
  },
  { id: "choose-date", label: "Choose Date", completed: false, active: false },
  { id: "payment", label: "Payment", completed: false, active: false },
];

export const SelectSkipPage: React.FC = () => {
  const { urlState, updateUrlState, getShareableUrl } = useUrlState();
  const { skips, loading, error } = useSkips(urlState.postcode, urlState.area);
  const { selectedSkip, selectSkip, isSelecting } = useSkipSelection(
    urlState.postcode,
    urlState.area
  );

  // Restore selected skip from URL on mount - only run once when skips are loaded
  useEffect(() => {
    if (urlState.selectedSkipId && skips && skips.length > 0 && !selectedSkip) {
      const skipFromUrl = skips.find(
        (skip) => skip.id.toString() === urlState.selectedSkipId
      );
      if (skipFromUrl) {
        selectSkip(skipFromUrl);
      }
    }
  }, [urlState.selectedSkipId, skips, selectedSkip, selectSkip]);

  // Update URL when skip selection changes - with debounce to prevent loops
  useEffect(() => {
    const selectedSkipIdStr = selectedSkip?.id?.toString() || null;
    if (selectedSkipIdStr !== urlState.selectedSkipId) {
      // Use a timeout to debounce the URL update
      const timeoutId = setTimeout(() => {
        updateUrlState({ selectedSkipId: selectedSkipIdStr });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedSkip?.id, urlState.selectedSkipId, updateUrlState]);

  const handleContinue = () => {
    if (selectedSkip) {
      // In a real app, this would navigate to the next step
      console.log("Continuing with skip:", selectedSkip);
      alert(
        `Selected ${selectedSkip.size} yard skip for £${(
          selectedSkip.price_before_vat *
          (1 + selectedSkip.vat / 100)
        ).toFixed(0)}`
      );
    }
  };

  const handleBack = () => {
    // In a real app, this would navigate to the previous step
    console.log("Going back");
  };

  const handleShare = async () => {
    const shareUrl = getShareableUrl();
    if (navigator.share && navigator.canShare({ url: shareUrl })) {
      try {
        await navigator.share({
          title: "REMWaste Skip Selection",
          text: selectedSkip
            ? `Check out this ${selectedSkip.size} yard skip I selected!`
            : "Choose your skip size on REMWaste",
          url: shareUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.log("Error copying to clipboard:", error);
        // Final fallback: show the URL
        prompt("Copy this link:", shareUrl);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Progress Bar - Mobile Sidebar & Desktop Horizontal */}

      <div className="container mx-auto px-4 py-8 md:pl-4 pl-20 pb-28 md:pb-16">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            className="text-white"
            itemClasses={{
              item: "text-white/70 data-[current=true]:text-primary-300",
              separator: "text-white/50",
            }}
          >
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem className="text-yellow-400">
              Book Skip
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>Select Skip Size</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <ProgressBar steps={steps} />

        {/* Main Content */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Choose Your Skip Size
              </h1>
            </div>
            <Button
              className="bg-gray-700 text-white hover:bg-gray-600 min-w-0 px-3"
              size="sm"
              isIconOnly
              onPress={handleShare}
              aria-label="Share this page"
              title="Share this page"
            >
              <Share2 size={16} />
            </Button>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Select the skip size that best suits your needs
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Showing results for {urlState.area} ({urlState.postcode})
          </p>
        </div>

        {/* Skip Grid */}
        <div className="max-w-7xl mx-auto">
          <SkipGrid
            skips={skips}
            selectedSkip={selectedSkip}
            onSelectSkip={selectSkip}
            loading={loading}
            error={error}
          />
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p className="mt-1">
            Need help choosing?{" "}
            <span className="text-primary-300 cursor-pointer hover:underline">
              Contact our team
            </span>
          </p>
        </div>

        {/* Selection Summary Bottom Bar */}
        <SelectionSummary
          selectedSkip={selectedSkip}
          onBack={handleBack}
          onContinue={handleContinue}
          isLoading={isSelecting}
        />
      </div>
    </div>
  );
};
