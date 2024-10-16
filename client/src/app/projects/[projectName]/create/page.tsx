import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Rocket } from "lucide-react";
import Link from "next/link";

const Page = ({ params }: { params: { projectName: string } }) => {
  return (
    <div className="flex w-full flex-col gap-10 p-6 md:p-10">
      <div className="flex w-full items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Rocket size={30} />
          <h1 className="text-xl font-bold md:text-4xl">
            Create Application to Konkuk-Project
          </h1>
        </div>

        <Button asChild variant="secondary" className="text-xs md:text-sm">
          <Link href={`/projects/${params.projectName}`}>Back</Link>
        </Button>
      </div>

      <form className="flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Application Name" required />
          </div>

          <div className="col-span-4 flex flex-col gap-4 md:col-span-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Application Description"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-5 flex w-full flex-col gap-4 md:col-span-3">
            <Label htmlFor="repository">Repository URL</Label>
            <Input id="repository" placeholder="Repository URL" required />
          </div>

          <div className="col-span-5 flex w-full flex-col gap-4 md:col-span-2">
            <Label htmlFor="location">Build file location</Label>
            <Input id="location" placeholder="Location" required />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="cpu">CPU Core</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="CPU Core" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="mem">Memory</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Memory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 GB</SelectItem>
                <SelectItem value="2">2 GB</SelectItem>
                <SelectItem value="4">4 GB</SelectItem>
                <SelectItem value="8">8 GB</SelectItem>
                <SelectItem value="16">16 GB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-4 flex flex-col gap-4 md:col-span-2">
            <Label htmlFor="disk">Disk</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Disk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 GB</SelectItem>
                <SelectItem value="8">8 GB</SelectItem>
                <SelectItem value="16">16 GB</SelectItem>
                <SelectItem value="32">32 GB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="yaml">YAML file</Label>
          <Textarea
            id="yaml"
            required
            className="min-h-[300px]"
            placeholder="YAML file"
          />
        </div>

        <Button
          type="submit"
          className="flex items-center gap-4 self-end px-4 py-6 text-sm md:text-lg"
        >
          <Plus size={24} />
          Create Application
        </Button>
      </form>
    </div>
  );
};

export default Page;
