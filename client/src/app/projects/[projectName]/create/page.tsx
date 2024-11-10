"use client";

import { createApplicationAction } from "@/app/actions/create-application-action";
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
import { Plus, Rocket } from "lucide-react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="flex items-center gap-4 self-end px-4 py-6 text-sm md:text-lg"
      disabled={pending}
    >
      {pending ? (
        "Loading..."
      ) : (
        <>
          <Plus size={24} />
          Create Application
        </>
      )}
    </Button>
  );
};

const Page = ({ params }: { params: { projectName: string } }) => {
  const [state, formAction] = useFormState(createApplicationAction, {
    message: null,
    status: "init",
  });

  return (
    <div className="flex w-full flex-col gap-10 p-6 md:p-10">
      <div className="flex w-full items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Rocket size={30} />
          <h1 className="text-xl font-bold md:text-4xl">
            Create Application to {params.projectName}
          </h1>
        </div>

        <Button asChild variant="secondary" className="text-xs md:text-sm">
          <Link href={`/projects/${params.projectName}`}>Back</Link>
        </Button>
      </div>

      <form className="flex flex-col gap-8" action={formAction}>
        <Input type="hidden" name="projectName" value={params.projectName} />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Application Name"
              required
            />
          </div>

          <div className="col-span-4 flex flex-col gap-4 md:col-span-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Application Description"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-5 flex w-full flex-col gap-4 md:col-span-3">
            <Label htmlFor="repository">Repository URL</Label>
            <Input
              id="repository"
              name="repository"
              placeholder="Repository URL"
              required
            />
          </div>

          <div className="col-span-5 flex w-full flex-col gap-4 md:col-span-2">
            <Label htmlFor="location">Build file location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Location"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              name="templateName"
              placeholder="Template Name"
              required
            />
          </div>

          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="namespace">Namespace</Label>
            <Input
              id="namespace"
              name="namespace"
              placeholder="Namespace"
              required
            />
          </div>

          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="replicaNumber">Replica Number</Label>
            <Input
              id="replicaNumber"
              name="replicaNumber"
              placeholder="Replica Number"
              required
              type="number"
              min={1}
              max={10}
            />
          </div>

          <div className="col-span-4 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="branch">Branch</Label>
            <Input id="branch" name="branch" placeholder="Branch" required />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="cpu">CPU Core</Label>
            <Input
              id="cpu"
              name="cpu"
              placeholder="CPU Core"
              required
              type="number"
              step={0.01}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="mem">Memory</Label>
            <Select name="mem">
              <SelectTrigger>
                <SelectValue placeholder="Memory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1024">1 GB</SelectItem>
                <SelectItem value="2048">2 GB</SelectItem>
                <SelectItem value="4096">4 GB</SelectItem>
                <SelectItem value="8192">8 GB</SelectItem>
                <SelectItem value="164064">16 GB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-4 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="region">Region</Label>
            <Select name="region">
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KOREA">🇰🇷 Korea</SelectItem>
                <SelectItem value="JAPAN">🇯🇵 Japan</SelectItem>
                <SelectItem value="US">🇺🇸 US</SelectItem>
                <SelectItem value="CHINA">🇨🇳 China</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-4 flex flex-col gap-4 md:col-span-1">
            <Label htmlFor="port">Port</Label>
            <Input id="port" name="port" placeholder="port" required />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="yaml">Image</Label>
          <Input
            id="image"
            name="image"
            placeholder="yacht24/new-test:v0.0.1"
            required
          />
        </div>

        {state.status === "error" && (
          <p className="text-red-500">{state.message}</p>
        )}
        <SubmitButton />
      </form>
    </div>
  );
};

export default Page;
