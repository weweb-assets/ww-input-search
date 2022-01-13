export default {
    editor: {
        label: {
            en: 'Search bar',
            fr: 'Search bar',
        },
        icon: 'fontawesome/solid/search',
    },
    triggerEvents: [
        { name: 'submit', label: { en: 'On submit' }, event: { value: '' } },
        { name: 'change', label: { en: 'On change' }, event: { value: '' } },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        inputWidth: {
            type: 'Length',
            label: {
                en: 'Input width',
                fr: 'Input width',
            },
            options: {
                unitChoices: [{ value: '%', label: '%', min: 0, max: 100 }],
            },
            defaultValue: '50%',
            hidden: content => !content.useSubmitButton,
        },
        value: {
            label: {
                en: 'Init value',
            },
            type: 'Text',
            section: 'settings',
            bindable: true,
        },
        useSubmitButton: {
            label: {
                en: 'Use a submit button',
                fr: 'Utiliser un bouton',
            },
            type: 'OnOff',
            section: 'settings',
            responsive: true,
            bindable: true,
            defaultValue: false,
        },
        buttonPosition: {
            section: 'settings',
            hidden: content => !content.useSubmitButton,
            label: {
                en: 'Button position',
                fr: 'Position du bouton',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'right', label: { en: 'Right' } },
                    { value: 'left', label: { en: 'Left' } },
                    { value: 'top', label: { en: 'Top' } },
                    { value: 'bottom', label: { en: 'Bottom' } },
                ],
            },
            responsive: true,
            defaultValue: 'right',
        },
        debounceDelay: {
            type: 'Length',
            label: {
                en: 'Delay',
                fr: 'Délai',
            },
            options: {
                unitChoices: [{ value: 'ms', label: 'ms', min: 1, max: 5000 }],
            },
            section: 'settings',
            defaultValue: '500ms',
        },
        submitButton: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-button' },
        },
        textInput: {
            hidden: true,
            defaultValue: { isWwObject: true, type: '9c263ffe-7da7-45e7-832c-543aef56faef' },
        },
    },
};
