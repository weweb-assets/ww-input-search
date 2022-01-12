<template>
    <div class="ww-webapp-search" :style="cssVariables" :class="{ editing: isEditing, selected: isSelected }">
        <div class="input-container">
            <wwElement
                class="textInput"
                v-bind="content.textInput"
                :ww-props="{ value, delay }"
                :name="wwElementState.name"
                @element-event="handleInputChange"
            ></wwElement>
        </div>
        <div v-if="content.submitEvent === 'button'" class="button-container">
            <wwElement class="submitButton" v-bind="content.submitButton" @click="handleClick"></wwElement>
        </div>

        <!-- wwEditor:start -->
        <div class="ww-webapp-search__menu">
            <wwEditorIcon small name="fontawesome/solid/search" />
        </div>
        <!-- wwEditor:end -->
    </div>
</template>

<script>
export default {
    props: {
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        wwElementState: { type: Object, required: true },
    },
    emits: ['update:content', 'trigger-event'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable(
            props.uid,
            'value',
            props.content.value === undefined ? '' : props.content.value
        );
        return { variableValue, setValue };
    },
    data() {
        return {
            tempValue: '',
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        isSelected() {
            /* wwEditor:start */
            return this.wwEditorState.isSelected;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        cssVariables() {
            let flexDirection = 'row';
            if (this.content.buttonPosition === 'left' || this.content.buttonPosition === 'right') {
                if (this.content.buttonPosition === 'left') flexDirection = 'row-reverse';
                else flexDirection = 'row';
            } else {
                if (this.content.buttonPosition === 'top') flexDirection = 'column-reverse';
                else flexDirection = 'column';
            }

            const buttonWidthValue = 100 - wwLib.wwUtils.getLengthUnit(this.content.inputWidth)[0];
            const buttonWidth =
                this.content.buttonPosition === 'top' || this.content.buttonPosition === 'bottom'
                    ? '100%'
                    : buttonWidthValue.toString() + '%';

            return {
                '--container-direction': flexDirection,
                '--input-width': this.content.inputWidth,
                '--button-width': buttonWidth,
            };
        },
        value() {
            return `${this.variableValue}`;
        },
        delay() {
            return wwLib.wwUtils.getLengthUnit(this.content.debounceDelay)[0];
        },
    },
    watch: {
        'content.value'(newValue) {
            newValue = `${newValue}`;
            if (newValue === this.value) return;
            this.tempValue = newValue;
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
    },
    methods: {
        handleInputChange(value) {
            this.tempValue = value;
            if (this.content.submitEvent !== 'debounce') return;
            if (value === this.value) return;
            this.setValue(value);
            this.$emit('trigger-event', { name: 'debounce', event: { value } });
        },
        handleClick() {
            this.setValue(this.tempValue);
            this.$emit('trigger-event', { name: 'submit', event: { value: this.tempValue } });
        },
    },
};
</script>

<style lang="scss" scoped>
:root {
    --container-direction: row;
}
.ww-webapp-search {
    width: 100%;
    display: flex;
    flex-direction: var(--container-direction);
    align-items: center;

    .input-container {
        width: var(--input-width);

        .text-input {
            width: 100%;
        }
    }

    .button-container {
        width: var(--button-width);

        .submitButton {
            width: 100%;
        }
    }

    /* wwEditor:start */
    &__status {
        position: absolute;
        top: -1px;
        color: var(--ww-color-white);
        padding: var(--ww-spacing-00) var(--ww-spacing-01);
        border-radius: var(--ww-spacing-00);
        background-color: var(--ww-color-blue-500);
        z-index: 10;
        opacity: 0;
        pointer-events: none;
        right: -1px;
    }
    &.selected {
        > .ww-webapp-search__status {
            opacity: 1;
            pointer-events: all;
        }
    }
    &.editing:hover {
        & > .border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid var(--ww-editor-color);
            pointer-events: none;
            z-index: 10;
        }
        > .ww-webapp-search__menu {
            opacity: 1;
            pointer-events: all;
        }
    }
    &__menu {
        display: flex;
        position: absolute;
        top: 0px;
        left: 5px;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        padding: var(--ww-spacing-01);
        transition: opacity 0.2s ease;
        z-index: 101;
        cursor: pointer;
        background-color: var(--ww-color-blue-500);
        color: var(--ww-color-white);
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
        }
    }
    /* wwEditor:end */
}
</style>
