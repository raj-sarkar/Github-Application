/**
 * Props for not found component
 * @property isDesktop - true if view width is desktop
 * @property imgSrc - src of image
 * @property heading - heading for the page
 * @property description - description of the page
 * @property buttonText - text in the button
 * @property onClick - function to handle the button click
 */
export type NotFoundProps = {
    isDesktop: boolean;
    imgSrc: string;
    heading: string;
    description: string;
    buttonText?: string;
    onClick?: () => void;
};
