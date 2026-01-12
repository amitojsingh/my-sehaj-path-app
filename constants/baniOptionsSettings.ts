import { Constants } from './constant';
import { ErrorConstants } from './ErrorConstant';
import { BaniOptionsSettings } from '@types';

export const BaniOptionsSettingsArray: BaniOptionsSettings[] = [
  {
    settingKey: 'paragraphMode',
    label: Constants.PARAGRAPH_MODE,
    value: false,
    errorMessage: ErrorConstants.FAILED_TO_SAVE_PARAGRAPH_MODE,
  },
  {
    settingKey: 'larivaar',
    label: Constants.LARIVAAR,
    value: false,
    errorMessage: ErrorConstants.FAILED_TO_SAVE_LARIVAAR,
  },
];
