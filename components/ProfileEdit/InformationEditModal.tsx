import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

export default function InformationEditModal() {
  return (
    <div className="flex flex-col gap-10">
      {/* Title */}
      <h2 className="text-2xl font-thin">Personal Information</h2>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Prefix</Label>
        <Input type="text" id="" placeholder="Mr/Ms/Mrs" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">First Name</Label>
        <Input type="text" id="" placeholder="First Name" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Middle Name</Label>
        <Input type="text" id="" placeholder="Middle Name" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Last Name</Label>
        <Input type="text" id="" placeholder="Last Name" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Age</Label>
        <Input type="text" id="" placeholder="Age" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Suffix</Label>
        <Input type="text" id="" placeholder="Suffix" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Accreditations</Label>
        <Input type="text" id="" placeholder="Accreditations" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Preferred Name</Label>
        <Input type="text" id="" placeholder="Preferred Name" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Pronouns</Label>
        <Input type="text" id="" placeholder="Pronouns" />
      </div>

      <h2 className="text-2xl font-thin">Affiliation</h2>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Title</Label>
        <Input type="text" id="" placeholder="Title" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Occupation</Label>
        <Input type="text" id="" placeholder="Occupation" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="">Company</Label>
        <Input type="text" id="" placeholder="Company" />
      </div>

      <div className="grid max-w-[380px] gap-1.5">
        <Label htmlFor="ge">Your message</Label>
        <Textarea placeholder="Type your message here." id="message" />
      </div>
    </div>
  );
}
