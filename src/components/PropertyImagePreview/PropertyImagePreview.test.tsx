import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyImagePreview from './PropertyImagePreview'; 

describe('PropertyImagePreview Component', () => {
  const testImageUrl = 'http://example.com/test-image.jpg';

  test('renders an image with the provided URL', () => {
    render(<PropertyImagePreview imagePreviewUrl={testImageUrl} />);
    const image = screen.getByRole('img', { name: /preview/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testImageUrl);
  });

  test('applies default width and height if not provided', () => {
    render(<PropertyImagePreview imagePreviewUrl={testImageUrl} />);
    const image = screen.getByRole('img', { name: /preview/i });
    expect(image).toHaveStyle('width: 400px');
    expect(image).toHaveStyle('height: 400px');
  });

  test('applies custom width and height when provided', () => {
    const customWidth = '500px';
    const customHeight = '300px';
    render(<PropertyImagePreview imagePreviewUrl={testImageUrl} width={customWidth} height={customHeight} />);
    const image = screen.getByRole('img', { name: /preview/i });
    expect(image).toHaveStyle(`width: ${customWidth}`);
    expect(image).toHaveStyle(`height: ${customHeight}`);
  });

  test('does not render an image if imagePreviewUrl is not provided', () => {
    const { container } = render(<PropertyImagePreview imagePreviewUrl={''} />);
    expect(container).toBeEmptyDOMElement();
  });
});
