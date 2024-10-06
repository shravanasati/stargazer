"use client";
import { Link } from "react-router-dom";
import { FireballMap } from "./FireballMap";
import { POTD } from "./POTD";
import { EventsBoard } from "./EventsBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LaunchesBoard } from "./LaunchesBoard";
import { ChatPanel } from "./ChatPanel";
import { ConstellationMap } from "./ConstellationMap";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Tabs defaultValue="potd" className="w-full">
          <div className="flex items-center justify-center mb-8 relative">
            <Link to="/" className="absolute left-0">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Home className="h-8 w-8" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
            <TabsList className="h-auto flex-wrap justify-center items-center">
              <TabsTrigger value="potd" className="m-1 px-4 py-2 text-center">
                APOD
              </TabsTrigger>
              <TabsTrigger
                value="fireball_map"
                className="m-1 px-4 py-2 text-center"
              >
                Fireball Map
              </TabsTrigger>
              <TabsTrigger value="events" className="m-1 px-4 py-2 text-center">
                Events
              </TabsTrigger>
              <TabsTrigger
                value="launches"
                className="m-1 px-4 py-2 text-center"
              >
                Launches
              </TabsTrigger>
              <TabsTrigger value="chat" className="m-1 px-4 py-2 text-center">
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="constellation_map"
                className="m-1 px-4 py-2 text-center"
              >
                Constellation Map
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="potd">
              <POTD />
            </TabsContent>
            <TabsContent value="fireball_map">
              <FireballMap />
            </TabsContent>
            <TabsContent value="events">
              <EventsBoard />
            </TabsContent>
            <TabsContent value="launches">
              <LaunchesBoard />
            </TabsContent>
            <TabsContent value="chat">
              <ChatPanel />
            </TabsContent>
            <TabsContent value="constellation_map">
              <ConstellationMap />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
