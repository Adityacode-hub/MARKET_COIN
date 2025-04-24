import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { 
  selectNotifications, 
  selectUnreadNotificationsCount,
  markNotificationAsRead,
  clearAllNotifications
} from '../store/alertsSlice';

const NotificationsContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 20px;
  cursor: pointer;
  position: relative;
  padding: 5px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.negative};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationsPanel = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  z-index: 100;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NotificationsList = styled.div`
  padding: 0;
`;

const NotificationItem = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme, unread }) => 
    unread ? `${theme.colors.primary}11` : 'transparent'};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationMessage = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 5px;
`;

const NotificationTime = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
`;

const EmptyMessage = styled.div`
  padding: 15px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
};

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadNotificationsCount);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  const handleNotificationClick = (id) => {
    dispatch(markNotificationAsRead(id));
  };
  
  const handleClearAll = () => {
    dispatch(clearAllNotifications());
    setIsOpen(false);
  };
  
  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <NotificationsContainer ref={containerRef}>
      <NotificationButton onClick={togglePanel}>
        🔔
        {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
      </NotificationButton>
      
      <NotificationsPanel isOpen={isOpen}>
        <PanelHeader>
          <PanelTitle>Notifications</PanelTitle>
          {notifications.length > 0 && (
            <ClearButton onClick={handleClearAll}>
              Clear All
            </ClearButton>
          )}
        </PanelHeader>
        
        <NotificationsList>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                unread={!notification.read}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <NotificationMessage>
                  {notification.message}
                </NotificationMessage>
                <NotificationTime>
                  {formatTime(notification.createdAt)}
                </NotificationTime>
              </NotificationItem>
            ))
          ) : (
            <EmptyMessage>No notifications</EmptyMessage>
          )}
        </NotificationsList>
      </NotificationsPanel>
    </NotificationsContainer>
  );
};

export default Notifications;
