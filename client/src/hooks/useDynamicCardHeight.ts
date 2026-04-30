import { useMemo } from "react";
import { useScreenDimensions } from "./useScreenDimensions";

interface CardDimensions {
    height: string;
    imageAspectRatio: string;
    imageHeight: string;
    titleFontSize: string;
    starSize: number;
    priceFontSize: string;
    padding: string;
}

interface CardContext {
    categoryRow?: boolean;
    searchGrid?: boolean;
}

export function useDynamicCardHeight(context: CardContext = {}) {
    const { width, height, isMobile, isTablet, isDesktop, isLargeDesktop } =
        useScreenDimensions();

    // Fallback dimensions in case of errors
    const fallbackDimensions: CardDimensions = {
        height: "auto",
        imageAspectRatio: "1/1",
        imageHeight: "200px",
        titleFontSize: "14px",
        starSize: 12,
        priceFontSize: "16px",
        padding: "16px",
    };

    return useMemo<CardDimensions>(() => {
        try {
            // Base calculations for different screen sizes
            if (isMobile) {
                return {
                    height: context.categoryRow ? "30vh" : "auto",
                    imageAspectRatio: "1/1", // Square for mobile
                    imageHeight: context.categoryRow ? "20vh" : "200px",
                    titleFontSize: "clamp(12px, 3vw, 14px)",
                    starSize: 12,
                    priceFontSize: "clamp(14px, 3.5vw, 16px)",
                    padding: "8px",
                };
            }

            if (isTablet) {
                return {
                    height: context.categoryRow ? "25vh" : "auto",
                    imageAspectRatio: "4/3", // Landscape for tablet
                    imageHeight: context.categoryRow ? "18vh" : "240px",
                    titleFontSize: "clamp(13px, 2vw, 15px)",
                    starSize: 14,
                    priceFontSize: "clamp(15px, 2.5vw, 17px)",
                    padding: "12px",
                };
            }

            if (isDesktop) {
                if (context.categoryRow) {
                    return {
                        height: "min(44vh, 400px)",
                        imageAspectRatio: "16/9", // Widescreen for desktop
                        imageHeight: "min(28vh, 250px)",
                        titleFontSize: "clamp(14px, 1.5vw, 16px)",
                        starSize: 14,
                        priceFontSize: "clamp(16px, 1.8vw, 18px)",
                        padding: "16px",
                    };
                } else {
                    // Search grid - auto height with responsive sizing
                    return {
                        height: "auto",
                        imageAspectRatio: "4/3",
                        imageHeight: "280px",
                        titleFontSize: "clamp(14px, 1.2vw, 16px)",
                        starSize: 14,
                        priceFontSize: "clamp(16px, 1.5vw, 18px)",
                        padding: "16px",
                    };
                }
            }

            // Large desktop
            if (context.categoryRow) {
                return {
                    height: "35vh",
                    imageAspectRatio: "16/9",
                    imageHeight: "22vh",
                    titleFontSize: "clamp(15px, 1.2vw, 18px)",
                    starSize: 16,
                    priceFontSize: "clamp(17px, 1.4vw, 20px)",
                    padding: "20px",
                };
            } else {
                return {
                    height: "auto",
                    imageAspectRatio: "4/3",
                    imageHeight: "320px",
                    titleFontSize: "clamp(15px, 1vw, 18px)",
                    starSize: 16,
                    priceFontSize: "clamp(17px, 1.2vw, 20px)",
                    padding: "20px",
                };
            }
        } catch (error) {
            console.warn(
                "Error calculating dynamic card dimensions, using fallback:",
                error,
            );
            return fallbackDimensions;
        }
    }, [
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        context,
        fallbackDimensions,
    ]);
}
