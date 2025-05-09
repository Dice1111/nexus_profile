import NavBar from "@/components/NavBar/NavBar";
import { NavBarNavigation } from "@/lib/navbar/type";
import ContactPage from "./ContactPage";
import RequestPage from "./RequestPage";
import { CONTACT_PANEL } from "@/lib/navbar/enum";

const navItems: NavBarNavigation<CONTACT_PANEL>[] = [
  { label: "Connection", panel: CONTACT_PANEL.CONNECTION },
  { label: "Request", panel: CONTACT_PANEL.REQUEST },
];

export default async function Page() {
  return (
    <div className=" container mx-auto   ">
      <NavBar data={navItems}>
        <div id={CONTACT_PANEL.CONNECTION}>
          <ContactPage />
        </div>
        <div id={CONTACT_PANEL.REQUEST}>
          <RequestPage />
        </div>
      </NavBar>
      {/* <div className="bg-yellow-500 h-36 sticky top-12 w-full"></div> */}
      {/* <ContactPage /> */}
      {/* <div className="bg-green-900 h-[2000px] w-full"></div> */}
    </div>
  );
}
