import { FireballMap } from "./FireballMap"
import { POTD } from "./POTD"
import { EventsBoard } from "./EventsBoard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { LaunchesBoard } from "./LaunchesBoard"

export default function Dashboard() {
	return (
		<Tabs defaultValue="potd" className="w-full">
			<TabsList>
				<TabsTrigger value="potd">POTD</TabsTrigger>
				<TabsTrigger value="fireball_map">Fireball Map</TabsTrigger>
				<TabsTrigger value="events">Events</TabsTrigger>
				<TabsTrigger value="launches">Launches</TabsTrigger>
			</TabsList>
			<TabsContent value="potd"><POTD /></TabsContent>
			<TabsContent value="fireball_map"><FireballMap/></TabsContent>
			<TabsContent value="events"><EventsBoard/></TabsContent>
			<TabsContent value="launches"><LaunchesBoard/></TabsContent>
		</Tabs>

	)
}