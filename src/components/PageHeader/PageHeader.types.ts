/**
 * Props for Page header component;
 * @property heading - heading of page
 * @property isLoading - true if loading state is active
 * @property description - description of page
 * @property hasButton - true if there is refresh button
 * @property handleClick - function to handle click on refresh button
 * @property buttonText - text inside button
 */
export type PageHeaderProps = {
    heading: string;
    isLoading?: boolean;
    description?: string;
    hasButton?: boolean;
    handleClick?: () => void;
    buttonText?: string;
};
