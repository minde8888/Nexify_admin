import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddAttributesContent from './AddAttributesContent';

jest.mock('../../../context/checkboxProvider');
jest.mock('../../../hooks/useFormikValues', () => ({
    __esModule: true,
    default: () => ({ addNewValue: jest.fn() }),
}));

jest.mock('../../InputFields/TextInputField', () => ({
    __esModule: true,
    TextInputField: ({ label, id, className, name }: TextInputFieldProps) => (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                name={name}
                className={className}
                defaultValue={'Test Title'}            
            />
        </div>
    ),
}));

interface CheckboxFieldProps {
    label?: string;
    className?: string;
}

jest.mock('../../InputFields/CheckboxField', () => {
    return {
        __esModule: true,
        CheckboxField: ({ 
             label, className }: CheckboxFieldProps) => (
            <label className={className}>Checkbox Mock - {label}</label>
        ),
    };
});

describe('AddAttributesContent Component', () => {

    test('renders the component and verifies all parts are present', () => {
        // Prepare your component props here
        const props = {
            setContent: jest.fn(),
            content: '',
            resetImages: false,
            setResetImages: jest.fn(),
            categories: [
                {
                    id: '1', 
                    title: 'Category 1',
                    description: 'Description of Category 1',
                    imageSrc: 'http://example.com/image1.jpg',
                    dateCreated: new Date().toISOString(),
                    subcategories: [] 
                }
            ],
            checkedCategories: { '1': true },
            componentKey: 0,
            lastRequestStatus: false
        };
  
        render(<AddAttributesContent {...props} />);
        
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByText(/Public/i)).toBeInTheDocument();
        expect(screen.getByText('Checkbox Mock - Category 1')).toBeInTheDocument();
    });
    
});

