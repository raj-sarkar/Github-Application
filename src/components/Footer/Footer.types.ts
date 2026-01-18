/**
 * Types of link icons item
 * @property id - id of item
 * @property icon - icon to render
 * @property link - link to re-direct
 * @property label - label of link item
 */
export type LinkIconItem = {
    id: string;
    icon: React.ElementType;
    link: string;
    label: string;
};

/**
 * Types of link text item
 * @property id - id of item
 * @property text - text to show
 * @property link - link to re-direct
 */
export type LinkTextItem = {
    id: string;
    text: string;
    link: string;
};
