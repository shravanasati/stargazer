"use client";

import { FireballMap } from "./FireballMap";
import { POTD } from "./POTD";
import { EventsBoard } from "./EventsBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LaunchesBoard } from "./LaunchesBoard";
import { ChatPanel } from "./ChatPanel";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <Tabs defaultValue="potd" className="w-full flex flex-col items-center">
          <TabsList className="h-auto flex-wrap justify-center items-center mb-8">
            <TabsTrigger value="potd" className="m-1 px-4 py-2 text-center">
              POTD
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
            <TabsTrigger value="launches" className="m-1 px-4 py-2 text-center">
              Launches
            </TabsTrigger>
            <TabsTrigger value="chat" className="m-1 px-4 py-2 text-center">
              Chat
            </TabsTrigger>
          </TabsList>
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
          </div>
        </Tabs>
      </div>
    </div>
  );
}
