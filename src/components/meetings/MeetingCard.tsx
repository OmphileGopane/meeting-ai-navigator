
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Meeting } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateMeetingStatus } from "@/services/mockData";
import { formatDate, formatTime } from "@/lib/dateUtils";

type MeetingCardProps = {
  meeting: Meeting;
  compact?: boolean;
  onStatusChange?: () => void;
};

export default function MeetingCard({ meeting, compact = false, onStatusChange }: MeetingCardProps) {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined' | 'archived'>(
    meeting.isAccepted ? 'accepted' : 
    meeting.isDeclined ? 'declined' : 
    meeting.isArchived ? 'archived' : 'pending'
  );
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewDetails = () => {
    navigate(`/meetings/${meeting.id}`);
  };

  const handleAction = (action: 'accept' | 'decline' | 'archive') => {
    const newStatus = {
      isAccepted: action === 'accept' ? true : false,
      isDeclined: action === 'decline' ? true : false,
      isArchived: action === 'archive' ? true : false
    };
    
    updateMeetingStatus(meeting.id, newStatus);
    
    setStatus(
      action === 'accept' ? 'accepted' : 
      action === 'decline' ? 'declined' : 'archived'
    );
    
    toast({
      title: `Meeting ${action}ed`,
      description: `"${meeting.subject}" has been ${action}ed.`,
    });

    // Notify parent component that status changed
    if (onStatusChange) {
      onStatusChange();
    }
  };

  const relevanceClass = `relevance-${meeting.relevanceScore}`;
  const dateTime = new Date(meeting.dateTime);

  return (
    <Card className={`${relevanceClass} meeting-card`}>
      <CardContent className={compact ? "p-3" : "p-4"}>
        <div className="flex justify-between items-start">
          <h3 className={`font-semibold ${compact ? "text-sm" : "text-base"}`}>{meeting.subject}</h3>
          <Badge 
            variant={
              meeting.relevanceScore === "high" ? "default" : 
              meeting.relevanceScore === "medium" ? "secondary" : "destructive"
            }
            className="text-xs capitalize ml-2"
          >
            {meeting.relevanceScore}
          </Badge>
        </div>
        
        <div className="text-muted-foreground text-sm mt-1">
          {meeting.organizer} • {meeting.organizerEmail}
        </div>
        
        <div className="flex items-center mt-3 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {formatDate(dateTime)} at {formatTime(dateTime)} ({meeting.duration} min)
          </span>
        </div>
        
        {meeting.location && (
          <div className="flex items-center mt-1 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{meeting.location}</span>
          </div>
        )}
        
        <div className="flex items-center mt-1 text-sm">
          <Users className="h-4 w-4 mr-1" />
          <span>{meeting.attendees.length} attendees</span>
        </div>
        
        {!compact && (
          <>
            <div className="mt-3">
              <p className="text-xs font-medium text-muted-foreground">AI RELEVANCE ANALYSIS:</p>
              <p className="text-sm mt-1">{meeting.relevanceReason}</p>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {meeting.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        )}
      </CardContent>
      
      {!compact && (
        <CardFooter className="flex justify-between bg-muted/40 p-4 pt-3">
          {status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAction('decline')}
              >
                Decline
              </Button>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleViewDetails}
                >
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleAction('accept')}
                >
                  Accept
                </Button>
              </div>
            </>
          )}
          
          {status === 'accepted' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAction('decline')}
              >
                Cancel Attendance
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleViewDetails}
              >
                View Details
              </Button>
            </>
          )}
          
          {status === 'declined' && (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleAction('archive')}
              >
                Archive
              </Button>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleViewDetails}
                >
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleAction('accept')}
                >
                  Accept
                </Button>
              </div>
            </>
          )}
          
          {status === 'archived' && (
            <div className="w-full flex justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleViewDetails}
              >
                View Details
              </Button>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
