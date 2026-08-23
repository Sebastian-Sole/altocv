import { Font } from "@react-pdf/renderer";

/**
 * Disable @react-pdf/renderer's automatic hyphenation.
 *
 * The default hyphenation callback breaks long words across lines and writes a
 * literal "-" into the PDF's text layer. An ATS reads that text layer, so a
 * skill like "Kubernetes" can extract as "KUBER-NETES" and simply fail to match
 * the posting's keyword. It is invisible on the rendered page and silent in the
 * product — the CV looks perfect and scores zero.
 *
 * Import this module for its side effect from every PDF entry point.
 */
Font.registerHyphenationCallback((word) => [word]);
