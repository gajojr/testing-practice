import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import SummaryForm from '../SummaryForm';

test('checkbox is unchecked by default', () => {
	render(<SummaryForm/>);
	const checkbox = screen.getByRole('checkbox');

	expect(checkbox).not.toBeChecked();
});

test('checkbox clicks enable and disable checkbox', async () => {
	const user = userEvent.setup();

	render(<SummaryForm/>);
	const checkbox = screen.getByRole('checkbox');
	const button = screen.getByRole('button');

	await user.click(checkbox);
	expect(button).toBeEnabled();

	await user.click(checkbox);
	expect(button).toBeDisabled();
});

test('popover responds to hover', async() => {
	const user = userEvent.setup();

	render(<SummaryForm/>);

	const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
	expect(nullPopover).not.toBeInTheDocument();

	const termsAndConditions = screen.getByText(/terms and conditions/i);
	await user.hover(termsAndConditions);

	const popover = screen.queryByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument();

	await user.unhover(termsAndConditions);
	expect(popover).not.toBeInTheDocument();
});