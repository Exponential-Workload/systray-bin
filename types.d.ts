/**
 * Installs the systray exec to the {@link filepath} - This is automatically called on install, however may need to be manually called when packaged using tools like pkg.
 * @param {boolean?} force If true, will always download the file, even if it already exists
 * @returns {Promise<string>} The full path to the executable
 */
export const install: (force?: boolean) => Promise<string>
/** Removes the installed systray executable */
export const remove: () => Promise<void>
/** The link to the exe to dl - platform dependent */
export const link: string
/** The filename (without path) of the exe */
export const filename: string
/** The full file path to download to - equivalent to path.join({@link filename}, {@link filepath}) */
export const filepath: string
/** The parent directory of {@link filepath the executable} */
export const directory: string
