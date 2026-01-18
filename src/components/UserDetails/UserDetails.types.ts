/**
 * Types in items of user details
 * @property title - title of the info field
 * @property text - the information of the field
 * @property id - id of the item
 * @property link - link to redirect on clicking item
 * @property isTargetBlank - true if link target should be blank
 */
export type UserDetailsItem = {
    title: string;
    text?: string | number | null;
    id: string;
    link?: string;
    isTargetBlank?: boolean;
};

/**
 * Props for UserDetails component
 * @property item - user info to show
 * @property iDesktop - true if view width is desktop
 */
export type UserDetailsProps = {
    item: UserDetailsItem;
    isDesktop: boolean;
};
