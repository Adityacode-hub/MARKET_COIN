import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addTransaction } from '../store/portfolioSlice';
import { formatNumber } from '../services/mockData';

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
`;

const FormTitle = styled.h3`
  margin: 0 0 15px 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 150px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme, transactionType }) => 
    transactionType === 'buy' ? theme.colors.positive : theme.colors.negative};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
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

const CurrentPrice = styled.div`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  
  span {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 500;
  }
`;

const TransactionForm = ({ crypto }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState(crypto.price.toString());
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return;
    }
    
    if (!price || isNaN(price) || Number(price) <= 0) {
      return;
    }
    
    dispatch(addTransaction({
      cryptoId: crypto.id,
      type,
      amount: Number(amount),
      price: Number(price),
      date
    }));
    
    // Reset form
    setAmount('');
    setPrice(crypto.price.toString());
    setDate(new Date().toISOString().split('T')[0]);
  };
  
  return (
    <FormContainer>
      <FormTitle>Add Transaction</FormTitle>
      
      <CurrentPrice>
        Current price: <span>${formatNumber(crypto.price)}</span>
      </CurrentPrice>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="type">Transaction Type</Label>
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="amount">Amount ({crypto.symbol})</Label>
          <Input
            id="amount"
            type="number"
            step="0.000001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter amount in ${crypto.symbol}`}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="price">Price per {crypto.symbol} (USD)</Label>
          <Input
            id="price"
            type="number"
            step="0.000001"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price in USD"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormGroup>
        
        <SubmitButton 
          type="submit"
          transactionType={type}
        >
          {type === 'buy' ? 'Buy' : 'Sell'} {crypto.symbol}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default TransactionForm;
