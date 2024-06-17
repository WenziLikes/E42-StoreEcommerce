declare module "*.jpg"
declare module "*.svg"

declare module "*.module.scss" {
    const classes: Record<string, string>
    export = classes
}

declare module "*.module.sass" {
    const classes: Record<string, string>
    export = classes
}

declare module "*.module.css" {
    const classes: Record<string, string>
    export = classes
}