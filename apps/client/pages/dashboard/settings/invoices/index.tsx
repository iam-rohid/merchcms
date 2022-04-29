import SEO from "components/SEO";
import AppSettingsLayout from "components/layouts/common-layouts/app-settings-layout";
import { CustomNextPage } from "src/types/next.type";

const InvoicesPage: CustomNextPage = () => {
  return <div>InvoicesPage</div>;
};

export default InvoicesPage;

InvoicesPage.getLayout = (page) => (
  <>
    <SEO title="Manage Invoices" />
    <AppSettingsLayout children={page} id="invoices" />
  </>
);
