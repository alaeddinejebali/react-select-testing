import React from 'react';
import { render, fireEvent, cleanup, waitForElement } from '@testing-library/react';
import MySelectComponent from './MySelectComponent';

afterEach(cleanup);

describe ('Test react-select component', () => {

    const mockedOptions = [
        {label: 'Mocked option 1', value: 'mocked-option-1'},
        {label: 'Mocked option 2', value: 'mocked-option-2'},
        {label: 'Mocked option 3', value: 'mocked-option-3'},
        {label: 'Mocked option 4', value: 'mocked-option-4'},
        {label: 'Mocked option 5', value: 'mocked-option-5'},
        {label: 'Mocked option 6', value: 'mocked-option-6'},
        {label: 'Mocked option 7', value: 'mocked-option-7'},
        {label: 'Mocked option 8', value: 'mocked-option-8'},
        {label: 'Mocked option 9', value: 'mocked-option-9'},
        {label: 'Mocked option 10', value: 'mocked-option-10'},
    ];

    it('should render without errors', async () => {
        const mockedOnChange = jest.fn();
        const { getByText } = render(<MySelectComponent 
            options={mockedOptions} 
            onChange={mockedOnChange} />);

        const placeholder = getByText('Select an option');

        expect(placeholder).toBeTruthy();
    });

    it('should call onChange when the first option is selected', async () => {
        const mockedOnChange = jest.fn();
        const { getByText, queryByTestId } = render(<MySelectComponent 
            options={mockedOptions} 
            onChange={mockedOnChange} />);

        const mySelectComponent = queryByTestId('my-select-component');

        expect(mySelectComponent).toBeDefined();
        expect(mySelectComponent).not.toBeNull();
        expect(mockedOnChange).toHaveBeenCalledTimes(0);
    
        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await waitForElement(() => getByText('Mocked option 1'));
        fireEvent.click(getByText('Mocked option 1'));

        expect(mockedOnChange).toHaveBeenCalledTimes(1);
        expect(mockedOnChange).toHaveBeenCalledWith({label: 'Mocked option 1', value: 'mocked-option-1'});

    });

    it('should call onChange when the first option is selected then second option then the 9th one', async () => {
        const mockedOnChange = jest.fn();
        const { getByText, queryByTestId } = render(<MySelectComponent 
            options={mockedOptions} 
            onChange={mockedOnChange} />);

        const mySelectComponent = queryByTestId('my-select-component');

        expect(mySelectComponent).toBeDefined();
        expect(mySelectComponent).not.toBeNull();
        expect(mockedOnChange).toHaveBeenCalledTimes(0);
    
        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await waitForElement(() => getByText('Mocked option 1'));
        fireEvent.click(getByText('Mocked option 1'));
    
        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await waitForElement(() => getByText('Mocked option 2'));
        fireEvent.click(getByText('Mocked option 2'));
    
        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await waitForElement(() => getByText('Mocked option 9'));
        fireEvent.click(getByText('Mocked option 9'));

        expect(mockedOnChange).toHaveBeenCalledTimes(3);
        expect(mockedOnChange).toHaveBeenCalledWith({label: 'Mocked option 9', value: 'mocked-option-9'});
    });

    it('should call onChange when filtering by input value', async () => {
      const mockedOnChange = jest.fn();
      const { getByText, queryByTestId, container } = render(<MySelectComponent 
        options={mockedOptions} 
        onChange={mockedOnChange} />);
        
        const mySelectComponent = queryByTestId('my-select-component');
    
        fireEvent.change(container.querySelector('input'), {
            target: { value: 'option 1' },
        });

        // select Mocked option 1
        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });  
        // select Mocked option 10
        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });

        await waitForElement(() => getByText('Mocked option 10'));
        fireEvent.click(getByText('Mocked option 10'));

        expect(mockedOnChange).toHaveBeenCalledTimes(1);
        expect(mockedOnChange).toHaveBeenCalledWith({label: 'Mocked option 10', value: 'mocked-option-10'});
    });

});