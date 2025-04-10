import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, MapPin, RotateCcw, Share, Trash2, User, Users } from "lucide-react";
import { Meeting } from "@/types";
import { getMeeting, updateMeetingStatus } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/dateUtils";

export default function MeetingDetail() {
  const { id } = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const fetchedMeeting = getMeeting(id);
      if (fetchedMeeting) {
        setMeeting(fetchedMeeting);
      }
      setLoading(false);
    }
  }, [id]);

  const handleAction = (action: 'accept' | 'decline' | 'archive') => {
    if (!meeting) return;
    
    const newStatus = {
      isAccepted: action === 'accept' ? true : false,
      isDeclined: action === 'decline' ? true : false,
      isArchived: action === 'archive' ? true : false
    };
    
    const updatedMeeting = updateMeetingStatus(meeting.id, newStatus);
    if (updatedMeeting) {
      setMeeting(updatedMeeting);
      
      toast({
        title: `Meeting ${action}ed`,
        description: `"${meeting.subject}" has been ${action}ed.`,
      });
      
      if (action === 'archive') {
        navigate('/inbox');
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-pulse-slow">Loading meeting details...</div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Meeting Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The meeting you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/inbox')} className="mt-4">
            Return to Inbox
          </Button>
        </div>
      </div>
    );
  }

  const dateTime = new Date(meeting.dateTime);
  const isActionable = !meeting.isAccepted && !meeting.isDeclined && !meeting.isArchived;
  const displayStatus = meeting.isAccepted 
    ? 'Accepted' 
    : meeting.isDeclined 
    ? 'Declined' 
    : meeting.isArchived 
    ? 'Archived' 
    : 'Pending';

  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-2"
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold">{meeting.subject}</h1>
          <div className="flex items-center mt-2">
            <Badge 
              variant={
                meeting.relevanceScore === "high" ? "default" : 
                meeting.relevanceScore === "medium" ? "secondary" : "destructive"
              }
              className="mr-2"
            >
              {meeting.relevanceScore} Relevance
            </Badge>
            <Badge variant="outline">Status: {displayStatus}</Badge>
          </div>
        </div>
        
        {isActionable && (
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => handleAction('decline')}
            >
              Decline
            </Button>
            <Button 
              onClick={() => handleAction('accept')}
            >
              Accept
            </Button>
          </div>
        )}
        
        {meeting.isAccepted && (
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => handleAction('decline')}
            >
              Cancel Attendance
            </Button>
          </div>
        )}
        
        {meeting.isDeclined && !meeting.isArchived && (
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => handleAction('archive')}
            >
              Archive
            </Button>
            <Button 
              onClick={() => handleAction('accept')}
            >
              Accept
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Meeting Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">ORGANIZED BY</h3>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>
                      {meeting.organizer} ({meeting.organizerEmail})
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">DATE & TIME</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{formatDateTime(dateTime)}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{meeting.duration} minutes</p>
                  </div>
                </div>
                
                {meeting.location && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">LOCATION</h3>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p>{meeting.location}</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">DESCRIPTION</h3>
                  <p className="whitespace-pre-line">{meeting.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">ATTENDEES</h3>
                  <div className="flex items-start">
                    <Users className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                    <div>
                      <p className="mb-1">{meeting.attendees.length} people invited</p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {meeting.attendees.map((attendee, index) => (
                          <p key={index}>{attendee}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">AI Relevance Analysis</h2>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">RELEVANCE SCORE</h3>
                <Badge 
                  variant={
                    meeting.relevanceScore === "high" ? "default" : 
                    meeting.relevanceScore === "medium" ? "secondary" : "destructive"
                  }
                  className="text-xs capitalize mb-4"
                >
                  {meeting.relevanceScore}
                </Badge>
                
                <h3 className="text-sm font-medium text-muted-foreground mb-1">ANALYSIS</h3>
                <p className="text-sm">{meeting.relevanceReason}</p>
                
                <h3 className="text-sm font-medium text-muted-foreground mt-4 mb-1">TAGS</h3>
                <div className="flex flex-wrap gap-1">
                  {meeting.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Share className="mr-2 h-4 w-4" />
                  Forward Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reschedule
                </Button>
                {!meeting.isArchived && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => handleAction('archive')}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Archive Meeting
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
