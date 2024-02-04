import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

const toggleMock = jest.fn();

const setup = (isOpen: boolean) => {
    render(
        <Modal isOpen={isOpen} toggle={toggleMock}>
            <div>Modal Content</div>
        </Modal>
    );
};

test('renders modal when isOpen is true', () => {
    setup(true);

    const modalOverlay = screen.getByTestId('test-toggle-id');
    expect(modalOverlay).toBeInTheDocument();

    fireEvent.click(modalOverlay);

    expect(toggleMock).toHaveBeenCalled();
});

test('does not render modal when isOpen is false', () => {
    setup(false);

    const modalOverlay = screen.queryByTestId('test-toggle-id');
    
    if (modalOverlay) {
        fireEvent.click(modalOverlay);
    }

    expect(toggleMock).not.toHaveBeenCalled();
});
