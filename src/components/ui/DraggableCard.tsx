import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from './Card';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DraggableCardProps {
  id: string;
  children: React.ReactNode;
}

export default function DraggableCard({ id, children}: DraggableCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartTime = useRef<number>(0);
  const navigate = useNavigate();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ 
    id,
    transition: {
      duration: 200,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1)',
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    cursor: 'pointer',
  };

  const handleMouseDown = () => {
    dragStartTime.current = Date.now();
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    const dragDuration = Date.now() - dragStartTime.current;
    // If the mouse was held for less than 200ms, consider it a click
    if (dragDuration < 200 && !isDragging && id) {
      navigate(id);
      }
    };

    const handleDragStart = () => {
      setIsDragging(true);
    };

    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        {...attributes}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDragStart={handleDragStart}
        className="w-full h-full"
      >
        <div {...listeners}>
          <Card>{children}</Card>
        </div>
      </div>
    );
  } 