import { CiPhone } from "react-icons/ci";
import { GoPeople, GoPlus } from "react-icons/go";
import { MdOutlineLink } from "react-icons/md";
import { PiImageLight, PiTextAaLight, PiTextTLight } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { TiSocialYoutube } from "react-icons/ti";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";

export default function AddProfileComponentDrawer() {
  return (
    <div className="flex justify-center ">
      <Drawer>
        <DrawerTrigger>
          <GoPlus
            size={30}
            className="mx-auto hover:scale-150 transition mt-4"
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">
              What do you like to add?
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Choose your poisons...
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="grid grid-cols-3 gap-5 mx-auto">
              <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent className="ab">
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <PiTextAaLight className="hover:scale-150 transition" />
              <PiImageLight className="hover:scale-150 transition" />
              <CiPhone className="hover:scale-150 transition" />
              <TfiEmail className="hover:scale-150 transition" />
              <MdOutlineLink className="hover:scale-150 transition" />
              <TiSocialYoutube className="hover:scale-150 transition" />
              <FaMapMarkerAlt className="hover:scale-150 transition" />
              <IoCloudUploadOutline className="hover:scale-150 transition" />
              <GoPeople className="hover:scale-150 transition" />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
