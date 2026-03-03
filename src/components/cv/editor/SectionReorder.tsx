import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { SECTION_LABELS } from "@/types/cv";

interface SectionReorderProps {
	sectionOrder: string[];
	onReorder: (newOrder: string[]) => void;
}

function SortableItem({ id }: { id: string }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex items-center gap-2 rounded-md border bg-card px-3 py-2"
		>
			<button
				type="button"
				className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
				{...attributes}
				{...listeners}
			>
				<GripVertical className="h-4 w-4" />
			</button>
			<span className="text-sm">{SECTION_LABELS[id] ?? id}</span>
		</div>
	);
}

export function SectionReorder({
	sectionOrder,
	onReorder,
}: SectionReorderProps) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = sectionOrder.indexOf(active.id as string);
			const newIndex = sectionOrder.indexOf(over.id as string);
			const newOrder = [...sectionOrder];
			newOrder.splice(oldIndex, 1);
			newOrder.splice(newIndex, 0, active.id as string);
			onReorder(newOrder);
		}
	}

	return (
		<div className="space-y-2">
			<h3 className="text-sm font-medium text-muted-foreground">
				Section Order
			</h3>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={sectionOrder}
					strategy={verticalListSortingStrategy}
				>
					<div className="space-y-1">
						{sectionOrder.map((id) => (
							<SortableItem key={id} id={id} />
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
}
