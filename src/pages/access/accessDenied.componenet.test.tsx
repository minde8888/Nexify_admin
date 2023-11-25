import { render } from '@testing-library/react';
import AccessDenied from './accessDenied';

describe('<AccessDenied />', () => {
    test('renders', () => {
        const { baseElement } = render(<AccessDenied />);
        expect(baseElement).toBeVisible();
    });
});