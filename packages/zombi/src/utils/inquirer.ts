// --- Imports -------------------------------------------------------------- //

import Inquirer from 'inquirer';

// --- Business logic ------------------------------------------------------- //

/**
 * A self-contained Inquirer prompt instance.
 */
export const prompt = Inquirer.createPromptModule();

/**
 * UI for reporting current status of the executing generator.
 */
export const status = new Inquirer.ui.BottomBar();
