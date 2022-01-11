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
    ],
    properties: {
        buttonPosition: {
            hidden: content => content.submitEvent !== 'button',
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
        },
        value: {
            label: {
                en: 'Init value',
            },
            type: 'Text',
            section: 'settings',
            bindable: true,
        },
        submitEvent: {
            label: {
                en: 'Submit event',
                fr: 'Evenement de soumission',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'debounce', label: { en: 'On change' } },
                    { value: 'button', label: { en: 'Button' } },
                ],
            },
            section: 'settings',
            responsive: true,
            bindable: true,
            defaultValue: 'debounce',
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
        enterKey: {
            type: 'OnOff',
            label: {
                en: 'Submitting by pressing enter',
                fr: 'Submitting by pressing enter',
            },
            section: 'settings',
            defaultValue: true,
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
