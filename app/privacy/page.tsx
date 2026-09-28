import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How the Ghana Invoice Generator handles your data: invoices stay in your browser, PDFs are created on your device, and no account is required.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy"
      intro={<p>Invoices contain personal and business information, so the generator is built to keep that information on your device.</p>}
      related={["/invoice-generator", "/free-invoice-generator"]}
    >
      <h2>Your invoice data</h2>
      <ul>
        <li>There is no account and no sign-up.</li>
        <li>Your draft invoice, including your business details and logo, is saved in your browser’s local storage so you can continue later.</li>
        <li>PDFs are created on your device. Invoice contents are not uploaded to our servers or sent to analytics or advertising providers.</li>
        <li>
          You can remove your saved draft at any time with “Delete saved data” below the invoice form, or by clearing your browser’s site data.
        </li>
      </ul>

      <h2>Advertising</h2>
      <p>
        Guide pages may show adverts from third-party providers such as Google AdSense. Those providers may use cookies to show and measure adverts, as described
        in their own privacy policies. Adverts are not shown in the invoice editor and are never included in your invoices.
      </p>

      <h2>Hosting</h2>
      <p>Like any website, our hosting provider may keep standard server logs (such as IP address and pages requested) for security and reliability.</p>
    </ContentPage>
  );
}
