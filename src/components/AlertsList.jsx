import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  selectFilteredAlerts, 
  selectShowTriggered, 
  toggleShowTriggered, 
  removeAlert, 
  clearTriggeredAlerts 
} from '../store/alertsSlice';
import { formatNumber } from '../services/mockData';

const AlertsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
`;

const AlertsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const AlertsTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AlertsControls = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterToggle = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  user-select: none;
`;

const ClearButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

const AlertsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AlertItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: ${({ theme, triggered }) => 
    triggered ? theme.colors.warning + '22' : theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid ${({ theme, condition, triggered }) => 
    triggered 
      ? theme.colors.warning 
      : condition === 'above' 
        ? theme.colors.positive 
        : theme.colors.negative};
  border-radius: 4px;
`;

const AlertInfo = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 5px;
`;

const AlertDetails = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

const AlertActions = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.negative};
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
`;

const AlertsList = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(selectFilteredAlerts);
  const showTriggered = useSelector(selectShowTriggered);
  
  const handleToggleShowTriggered = () => {
    dispatch(toggleShowTriggered());
  };
  
  const handleClearTriggered = () => {
    dispatch(clearTriggeredAlerts());
  };
  
  const handleRemoveAlert = (alertId) => {
    dispatch(removeAlert(alertId));
  };
  
  const hasTriggeredAlerts = useSelector(state => 
    state.alerts.alerts.some(alert => alert.triggered)
  );
  
  return (
    <AlertsContainer>
      <AlertsHeader>
        <AlertsTitle>Price Alerts</AlertsTitle>
        <AlertsControls>
          <FilterToggle>
            <Checkbox
              type="checkbox"
              id="show-triggered"
              checked={showTriggered}
              onChange={handleToggleShowTriggered}
            />
            <Label htmlFor="show-triggered">
              Show triggered alerts
            </Label>
          </FilterToggle>
          
          <ClearButton 
            onClick={handleClearTriggered}
            disabled={!hasTriggeredAlerts}
          >
            Clear Triggered
          </ClearButton>
        </AlertsControls>
      </AlertsHeader>
      
      {alerts.length > 0 ? (
        <AlertsListContainer>
          {alerts.map(alert => (
            <AlertItem 
              key={alert.id}
              condition={alert.condition}
              triggered={alert.triggered}
            >
              <AlertInfo>
                <AlertTitle>
                  {alert.cryptoName} ({alert.cryptoSymbol})
                </AlertTitle>
                <AlertDetails>
                  {alert.triggered ? (
                    <>
                      Triggered: Price went {alert.condition} ${formatNumber(alert.price)} 
                      at ${formatNumber(alert.triggerPrice)}
                    </>
                  ) : (
                    <>
                      Alert when price goes {alert.condition} ${formatNumber(alert.price)}
                    </>
                  )}
                </AlertDetails>
              </AlertInfo>
              
              <AlertActions>
                <DeleteButton 
                  onClick={() => handleRemoveAlert(alert.id)}
                  aria-label="Delete alert"
                >
                  ×
                </DeleteButton>
              </AlertActions>
            </AlertItem>
          ))}
        </AlertsListContainer>
      ) : (
        <EmptyMessage>
          No alerts found. Create a new alert above.
        </EmptyMessage>
      )}
    </AlertsContainer>
  );
};

export default AlertsList;
