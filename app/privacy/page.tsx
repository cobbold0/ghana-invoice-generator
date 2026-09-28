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

      <h2>Analytics</h2>
      <p>
        We may use Google Analytics to count page views and anonymous actions, such as when an invoice is started, a template is chosen, or a PDF is downloaded
        or printed. Only the template, currency and number of items are recorded with these actions — never names, addresses, amounts or other invoice
        contents. Analytics cookies are only used if you accept them in the cookie banner.
      </p>

      <h2>Advertising</h2>
      <p>
        Guide pages may show adverts from third-party providers such as Google AdSense. Adverts are shown whether or not you accept cookies. If you accept,
        adverts may be personalised to your interests; if you choose “No thanks”, you see non-personalised adverts, which may still use cookies for things
        like limiting how often an advert appears and preventing fraud. Adverts are not shown in the invoice editor and are never included in your invoices.
      </p>

      <h2>Changing your choice</h2>
      <p>Use “Cookie settings” at the bottom of any page to change your choice at any time.</p>

      <h2>Hosting</h2>
      <p>Like any website, our hosting provider may keep standard server logs (such as IP address and pages requested) for security and reliability.</p>
    </ContentPage>
  );
}
