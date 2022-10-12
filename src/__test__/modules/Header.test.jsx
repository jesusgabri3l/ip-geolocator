import { it, expect, describe, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Header from '../../components/Header';

beforeEach(()=> {
    const onSubmitIPHandler = () => console.log('sending IP');
    render(<Header onSubmitIPHandler={onSubmitIPHandler} />);
});

const clearInputAndType = async (screen, typeText='') => {
    const input = screen.getByRole('input')
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    await userEvent.clear(input);
    await userEvent.type(input, typeText);  
    expect(input).toHaveValue(typeText)
}

describe('Testing header UI components', () => {

    it('Should validate main UI components', async () => {
        expect(screen.getByText('IP Address tracker')).toBeInTheDocument();
        expect(screen.getByRole('input')).toBeInTheDocument();
        expect(screen.getByRole('input')).toHaveValue('');
        expect(screen.getByRole('button-submit')).toBeInTheDocument();
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('Should validate Google IP when first load', async () => {
        expect(screen.getByTestId('loading')).toBeInTheDocument();
        await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
        expect(await screen.findByTestId('ip-response')).toHaveTextContent('8.8.8.8');
        expect(await screen.findByTestId('location-response')).toHaveTextContent('Mountain View');
        expect(await screen.findByTestId('timezone-response')).toHaveTextContent('-07:00');
        expect(await screen.findByTestId('isp-response')).toHaveTextContent('Google LLC');
    });

})

describe('Testing main features', () => {

    it('Should validate typing a new IP Address', async () => {
        await clearInputAndType(screen, '208.67.222.222')
        await userEvent.click(screen.getByRole('button-submit'));
        expect(await screen.findByTestId('ip-response')).toHaveTextContent('208.67.222.222');
        expect(await screen.findByTestId('location-response')).toHaveTextContent('Toronto');
        expect(await screen.findByTestId('timezone-response')).toHaveTextContent('-04:00');
        expect(await screen.findByTestId('isp-response')).toHaveTextContent('Cisco OpenDNS, LLC');;
    })

    it('Should validate non-valid IP Address', async () => {
        await clearInputAndType(screen, '208.67.2')
        await userEvent.click(screen.getByRole('button-submit'));
        expect(await screen.findByTestId('error')).toBeInTheDocument();
    });

    it('Should validate non-valid IP Address', async () => {
        await clearInputAndType(screen, 'This is a test')
        await userEvent.click(screen.getByRole('button-submit'));
        expect(await screen.findByTestId('error')).toBeInTheDocument();
    })

    it('Should validate non-valid IP Address', async () => {
        await clearInputAndType(screen);
        await userEvent.click(screen.getByRole('button-submit'));
        expect(await screen.findByTestId('error')).toBeInTheDocument();
    });
    
})