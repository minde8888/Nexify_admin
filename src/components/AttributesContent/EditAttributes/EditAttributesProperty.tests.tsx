import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import EditAttributesProperty from './EditAttributesProperty';

jest.mock('../../../hooks/useFormikValues', () => ({
    useFormikValues: jest.fn(() => ({ addNewValue: jest.fn() })),
}));

jest.mock('../../UploadImage/UploadImage', () => (props: any) => (
    <input
      type="file"
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          props.handleAddImage([{ file: e.target.files[0] }]);
        }
      }}
      data-testid="upload-image"
    />
  ));
  

describe('EditAttributesProperty', () => {
    const initialProps = {
        attributeName: 'Test Attribute',
        imageName: 'test-image-url.jpg',
        id: '1',
        disabled: false,
    };

    test('renders with initial props', () => {
        render(<EditAttributesProperty {...initialProps} />);
        expect(screen.getByPlaceholderText('Enter attribute name')).toHaveValue(initialProps.attributeName);
        expect(screen.getByRole('button', { name: 'Publish' })).not.toBeDisabled();
    });

    test('updates image preview when a new image is added', async () => {
        render(<EditAttributesProperty {...initialProps} />);
        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        await userEvent.upload(screen.getByTestId('upload-image'), file);
        expect(screen.getByAltText('image preview')).toHaveAttribute('src', expect.stringContaining('chucknorris.png'));
    });

    test('enables publish button based on disabled prop', () => {
        const { rerender } = render(<EditAttributesProperty {...initialProps} disabled={true} />);
        expect(screen.getByRole('button', { name: 'Publish' })).toBeDisabled();

        rerender(<EditAttributesProperty {...initialProps} disabled={false} />);
        expect(screen.getByRole('button', { name: 'Publish' })).not.toBeDisabled();
    });
});
