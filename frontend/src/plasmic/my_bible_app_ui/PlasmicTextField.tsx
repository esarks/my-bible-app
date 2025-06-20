/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 9ALKC1eSkKzzoBpvUcK3nT
// Component: VR7oW1jljqil

import * as React from "react";

import {
  Flex as Flex__,
  MultiChoiceArg,
  PlasmicDataSourceContextProvider as PlasmicDataSourceContextProvider__,
  PlasmicIcon as PlasmicIcon__,
  PlasmicImg as PlasmicImg__,
  PlasmicLink as PlasmicLink__,
  PlasmicPageGuard as PlasmicPageGuard__,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  Stack as Stack__,
  StrictProps,
  Trans as Trans__,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  ensureGlobalVariants,
  generateOnMutateForSpec,
  generateStateOnChangeProp,
  generateStateOnChangePropForCodeComponents,
  generateStateValueProp,
  get as $stateGet,
  hasVariant,
  initializeCodeComponentStates,
  initializePlasmicStates,
  makeFragment,
  omit,
  pick,
  renderPlasmicSlot,
  set as $stateSet,
  useCurrentUser,
  useDollarState,
  usePlasmicTranslator,
  useTrigger,
  wrapWithClassName
} from "@plasmicapp/react-web";
import {
  DataCtxReader as DataCtxReader__,
  useDataEnv,
  useGlobalActions
} from "@plasmicapp/react-web/lib/host";

import { BaseTextField } from "@plasmicpkgs/react-aria/skinny/registerTextField";
import Label from "../../components/Label"; // plasmic-import: hDD5SRwVjaSW/component
import TextInput from "../../components/TextInput"; // plasmic-import: aitFMueJo9TT/component
import TextAreaInput from "../../components/TextAreaInput"; // plasmic-import: o2tMRK8No0Bd/component
import Description from "../../components/Description"; // plasmic-import: 6AmSVyeMyGPY/component

import "@plasmicapp/react-web/lib/plasmic.css";
import "../defaultStyles.css"; // plasmic-import: global/defaultcss
import "../antd_5_hostless/plasmic.css"; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import "../plasmic_rich_components/plasmic.css"; // plasmic-import: jkU633o1Cz7HrJdwdxhVHk/projectcss
import "../library_tailwind_3_4_color_tokens/plasmic.css"; // plasmic-import: 5ZtnypMovRHeeP3YTdPCYL/projectcss
import "../library_tailwind_3_4_number_tokens/plasmic.css"; // plasmic-import: 4vjRXvnb4XuY6J15w9oRcQ/projectcss
import "../plasmic_login_page.css"; // plasmic-import: 9ALKC1eSkKzzoBpvUcK3nT/projectcss
import "./PlasmicTextField.css"; // plasmic-import: VR7oW1jljqil/css

import CircleIcon from "./icons/PlasmicIcon__Circle"; // plasmic-import: sTVs6XRFORwY/icon

createPlasmicElementProxy;

export type PlasmicTextField__VariantMembers = {
  multiLine: "multiLine";
  iconStart: "iconStart";
  iconEnd: "iconEnd";
};
export type PlasmicTextField__VariantsArgs = {
  multiLine?: SingleBooleanChoiceArg<"multiLine">;
  iconStart?: SingleBooleanChoiceArg<"iconStart">;
  iconEnd?: SingleBooleanChoiceArg<"iconEnd">;
};
type VariantPropType = keyof PlasmicTextField__VariantsArgs;
export const PlasmicTextField__VariantProps = new Array<VariantPropType>(
  "multiLine",
  "iconStart",
  "iconEnd"
);

export type PlasmicTextField__ArgsType = {
  value?: string;
  placeholder?: string;
  showLabel?: boolean;
  showDescription?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  type?: "text" | "search" | "url" | "tel" | "email" | "password";
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  autoComplete?:
    | "on"
    | "off"
    | "name"
    | "honorific-prefix"
    | "given-name"
    | "additional-name"
    | "family-name"
    | "honorific-suffix"
    | "nickname"
    | "email"
    | "username"
    | "new-password"
    | "current-password"
    | "one-time-code"
    | "organization-title"
    | "organization"
    | "street-address"
    | "shipping"
    | "billing"
    | "address-line1"
    | "address-line2"
    | "address-line3"
    | "address-level4"
    | "address-level3"
    | "address-level2"
    | "address-level1"
    | "country"
    | "country-name"
    | "postal-code"
    | "cc-name"
    | "cc-given-name"
    | "cc-additional-name"
    | "cc-family-name"
    | "cc-number"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-csc"
    | "cc-type"
    | "transaction-currency"
    | "transaction-amount"
    | "language"
    | "bday"
    | "bday-day"
    | "bday-month"
    | "bday-year"
    | "sex"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-area-code"
    | "tel-local"
    | "tel-local-suffix"
    | "tel-local-prefix"
    | "tel-extension"
    | "impp"
    | "url"
    | "photo"
    | "webauthn";
  ariaLabel?: string;
  onChange?: (val: string) => void;
  label?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
  description?: React.ReactNode;
};
type ArgPropType = keyof PlasmicTextField__ArgsType;
export const PlasmicTextField__ArgProps = new Array<ArgPropType>(
  "value",
  "placeholder",
  "showLabel",
  "showDescription",
  "disabled",
  "readOnly",
  "autoFocus",
  "type",
  "inputMode",
  "autoComplete",
  "ariaLabel",
  "onChange",
  "label",
  "start",
  "end",
  "description"
);

export type PlasmicTextField__OverridesType = {
  ariaTextField?: Flex__<typeof BaseTextField>;
  label?: Flex__<typeof Label>;
  textInput?: Flex__<typeof TextInput>;
  textAreaInput?: Flex__<typeof TextAreaInput>;
  description?: Flex__<typeof Description>;
};

export interface DefaultTextFieldProps {
  value?: string;
  placeholder?: string;
  showLabel?: boolean;
  showDescription?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  type?: "text" | "search" | "url" | "tel" | "email" | "password";
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  autoComplete?:
    | "on"
    | "off"
    | "name"
    | "honorific-prefix"
    | "given-name"
    | "additional-name"
    | "family-name"
    | "honorific-suffix"
    | "nickname"
    | "email"
    | "username"
    | "new-password"
    | "current-password"
    | "one-time-code"
    | "organization-title"
    | "organization"
    | "street-address"
    | "shipping"
    | "billing"
    | "address-line1"
    | "address-line2"
    | "address-line3"
    | "address-level4"
    | "address-level3"
    | "address-level2"
    | "address-level1"
    | "country"
    | "country-name"
    | "postal-code"
    | "cc-name"
    | "cc-given-name"
    | "cc-additional-name"
    | "cc-family-name"
    | "cc-number"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-csc"
    | "cc-type"
    | "transaction-currency"
    | "transaction-amount"
    | "language"
    | "bday"
    | "bday-day"
    | "bday-month"
    | "bday-year"
    | "sex"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-area-code"
    | "tel-local"
    | "tel-local-suffix"
    | "tel-local-prefix"
    | "tel-extension"
    | "impp"
    | "url"
    | "photo"
    | "webauthn";
  ariaLabel?: string;
  onChange?: (val: string) => void;
  label?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
  description?: React.ReactNode;
  multiLine?: SingleBooleanChoiceArg<"multiLine">;
  iconStart?: SingleBooleanChoiceArg<"iconStart">;
  iconEnd?: SingleBooleanChoiceArg<"iconEnd">;
  className?: string;
}

const $$ = {};

function PlasmicTextField__RenderFunc(props: {
  variants: PlasmicTextField__VariantsArgs;
  args: PlasmicTextField__ArgsType;
  overrides: PlasmicTextField__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(
    () =>
      Object.assign(
        {
          showLabel: true,
          showDescription: false,
          readOnly: false,
          autoFocus: false
        },
        Object.fromEntries(
          Object.entries(props.args).filter(([_, v]) => v !== undefined)
        )
      ),
    [props.args]
  );

  const $props = {
    ...args,
    ...variants
  };

  const $ctx = useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  const currentUser = useCurrentUser?.() || {};

  const stateSpecs: Parameters<typeof useDollarState>[0] = React.useMemo(
    () => [
      {
        path: "ariaTextField.value",
        type: "writable",
        variableType: "text",

        valueProp: "value",
        onChangeProp: "onChange"
      },
      {
        path: "multiLine",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.multiLine
      },
      {
        path: "iconStart",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.iconStart
      },
      {
        path: "iconEnd",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.iconEnd
      },
      {
        path: "textInput.value",
        type: "private",
        variableType: "text",
        initFunc: ({ $props, $state, $queries, $ctx }) => undefined
      },
      {
        path: "textAreaInput.value",
        type: "private",
        variableType: "text",
        initFunc: ({ $props, $state, $queries, $ctx }) => undefined
      }
    ],
    [$props, $ctx, $refs]
  );
  const $state = useDollarState(stateSpecs, {
    $props,
    $ctx,
    $queries: {},
    $refs
  });

  const [$ccVariants, setDollarCcVariants] = React.useState<
    Record<string, boolean>
  >({
    disabled: false,
    readonly: false
  });
  const updateVariant = React.useCallback(
    (changes: Record<string, boolean>) => {
      setDollarCcVariants(prev => {
        if (!Object.keys(changes).some(k => prev[k] !== changes[k])) {
          return prev;
        }
        return { ...prev, ...changes };
      });
    },
    []
  );

  return (
    <BaseTextField
      data-plasmic-name={"ariaTextField"}
      data-plasmic-override={overrides.ariaTextField}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      aria-label={args.ariaLabel}
      autoComplete={args.autoComplete}
      autoFocus={args.autoFocus}
      className={classNames(
        "__wab_instance",
        "root_reset_9ALKC1eSkKzzoBpvUcK3nT",
        "plasmic_default_styles",
        "plasmic_mixins",
        "plasmic_tokens",
        "TextField__ariaTextField__yP5G5",
        {
          TextField__ariaTextFieldiconEnd__yP5G5QWo27: hasVariant(
            $state,
            "iconEnd",
            "iconEnd"
          ),
          TextField__ariaTextFieldiconStart__yP5G58OoH: hasVariant(
            $state,
            "iconStart",
            "iconStart"
          ),
          TextField__ariaTextFieldiconStart_iconEnd__yP5G58OoHQWo27:
            hasVariant($state, "iconStart", "iconStart") &&
            hasVariant($state, "iconEnd", "iconEnd"),
          TextField__ariaTextFieldmultiLine__yP5G58KRpt: hasVariant(
            $state,
            "multiLine",
            "multiLine"
          )
        }
      )}
      inputMode={args.inputMode}
      isDisabled={args.disabled}
      isReadOnly={args.readOnly}
      onChange={async (...eventArgs: any) => {
        generateStateOnChangeProp($state, ["ariaTextField", "value"]).apply(
          null,
          eventArgs
        );
      }}
      plasmicUpdateVariant={updateVariant}
      type={args.type}
      value={generateStateValueProp($state, ["ariaTextField", "value"])}
    >
      {$props.showLabel ? (
        <Label
          data-plasmic-name={"label"}
          data-plasmic-override={overrides.label}
          className={classNames("__wab_instance", "TextField__label__wsUuX", {
            TextField__labelmultiLine__wsUuX8KRpt: hasVariant(
              $state,
              "multiLine",
              "multiLine"
            )
          })}
        >
          {renderPlasmicSlot({
            defaultContents: "Label",
            value: args.label
          })}
        </Label>
      ) : null}
      <div
        className={classNames(
          "plasmic_default__all",
          "plasmic_default__div",
          "TextField__freeBox__c0Rx",
          {
            TextField__freeBoxiconEnd__c0RxQWo27: hasVariant(
              $state,
              "iconEnd",
              "iconEnd"
            ),
            TextField__freeBoxiconStart__c0Rx8OoH: hasVariant(
              $state,
              "iconStart",
              "iconStart"
            ),
            TextField__freeBoxmultiLine__c0Rx8KRpt: hasVariant(
              $state,
              "multiLine",
              "multiLine"
            )
          }
        )}
      >
        <div
          className={classNames(
            "plasmic_default__all",
            "plasmic_default__div",
            "TextField__freeBox__mZ5Sc",
            {
              TextField__freeBoxiconStart__mZ5Sc8OoH: hasVariant(
                $state,
                "iconStart",
                "iconStart"
              ),
              TextField__freeBoxmultiLine__mZ5Sc8KRpt: hasVariant(
                $state,
                "multiLine",
                "multiLine"
              )
            }
          )}
        >
          {renderPlasmicSlot({
            defaultContents: (
              <CircleIcon
                className={classNames(
                  "plasmic_default__all",
                  "plasmic_default__svg",
                  "TextField__svg__uzhkz"
                )}
                role={"img"}
              />
            ),

            value: args.start,
            className: classNames("TextField__slotTargetStart___1Tktu", {
              TextField__slotTargetStarticonStart___1Tktu8OoH: hasVariant(
                $state,
                "iconStart",
                "iconStart"
              )
            })
          })}
        </div>
        {(hasVariant($state, "multiLine", "multiLine") ? false : true) ? (
          <TextInput
            data-plasmic-name={"textInput"}
            data-plasmic-override={overrides.textInput}
            disabled={$ccVariants["disabled"] ? true : undefined}
            onChange={async (...eventArgs: any) => {
              generateStateOnChangeProp($state, ["textInput", "value"]).apply(
                null,
                eventArgs
              );

              if (
                eventArgs.length > 1 &&
                eventArgs[1] &&
                eventArgs[1]._plasmic_state_init_
              ) {
                return;
              }
            }}
            padded={
              hasVariant($state, "iconStart", "iconStart") &&
              hasVariant($state, "iconEnd", "iconEnd")
                ? ["right", "left"]
                : hasVariant($state, "iconEnd", "iconEnd")
                ? ["right"]
                : hasVariant($state, "iconStart", "iconStart")
                ? ["left"]
                : undefined
            }
            placeholder={args.placeholder}
            value={generateStateValueProp($state, ["textInput", "value"])}
          />
        ) : null}
        {(hasVariant($state, "multiLine", "multiLine") ? true : false) ? (
          <TextAreaInput
            data-plasmic-name={"textAreaInput"}
            data-plasmic-override={overrides.textAreaInput}
            className={classNames("__wab_instance", {
              TextField__textAreaInputmultiLine__y1HEk8KRpt: hasVariant(
                $state,
                "multiLine",
                "multiLine"
              )
            })}
            onChange={async (...eventArgs: any) => {
              generateStateOnChangeProp($state, [
                "textAreaInput",
                "value"
              ]).apply(null, eventArgs);

              if (
                eventArgs.length > 1 &&
                eventArgs[1] &&
                eventArgs[1]._plasmic_state_init_
              ) {
                return;
              }
            }}
            padded={
              hasVariant($state, "iconStart", "iconStart") &&
              hasVariant($state, "iconEnd", "iconEnd")
                ? ["right", "left"]
                : hasVariant($state, "iconEnd", "iconEnd")
                ? ["right"]
                : hasVariant($state, "iconStart", "iconStart")
                ? ["left"]
                : undefined
            }
            placeholder={args.placeholder}
            value={generateStateValueProp($state, ["textAreaInput", "value"])}
          />
        ) : null}
        <div
          className={classNames(
            "plasmic_default__all",
            "plasmic_default__div",
            "TextField__freeBox__r8Pun",
            {
              TextField__freeBoxiconEnd__r8PunQWo27: hasVariant(
                $state,
                "iconEnd",
                "iconEnd"
              ),
              TextField__freeBoxiconStart__r8Pun8OoH: hasVariant(
                $state,
                "iconStart",
                "iconStart"
              )
            }
          )}
        >
          {renderPlasmicSlot({
            defaultContents: (
              <CircleIcon
                className={classNames(
                  "plasmic_default__all",
                  "plasmic_default__svg",
                  "TextField__svg__tNYs4"
                )}
                role={"img"}
              />
            ),

            value: args.end,
            className: classNames("TextField__slotTargetEnd__tE4Df")
          })}
        </div>
      </div>
      {$props.showDescription ? (
        <Description
          data-plasmic-name={"description"}
          data-plasmic-override={overrides.description}
          className={classNames(
            "__wab_instance",
            "TextField__description__lrAv4"
          )}
        >
          {renderPlasmicSlot({
            defaultContents: "Description...",
            value: args.description
          })}
        </Description>
      ) : null}
    </BaseTextField>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  ariaTextField: [
    "ariaTextField",
    "label",
    "textInput",
    "textAreaInput",
    "description"
  ],
  label: ["label"],
  textInput: ["textInput"],
  textAreaInput: ["textAreaInput"],
  description: ["description"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  ariaTextField: typeof BaseTextField;
  label: typeof Label;
  textInput: typeof TextInput;
  textAreaInput: typeof TextAreaInput;
  description: typeof Description;
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicTextField__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicTextField__VariantsArgs;
    args?: PlasmicTextField__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicTextField__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicTextField__ArgsType, ReservedPropsType> &
    // Specify overrides for each element directly as props
    Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    // Specify props for the root element
    Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicTextField__ArgProps,
          internalVariantPropNames: PlasmicTextField__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicTextField__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "ariaTextField") {
    func.displayName = "PlasmicTextField";
  } else {
    func.displayName = `PlasmicTextField.${nodeName}`;
  }
  return func;
}

export const PlasmicTextField = Object.assign(
  // Top-level PlasmicTextField renders the root element
  makeNodeComponent("ariaTextField"),
  {
    // Helper components rendering sub-elements
    label: makeNodeComponent("label"),
    textInput: makeNodeComponent("textInput"),
    textAreaInput: makeNodeComponent("textAreaInput"),
    description: makeNodeComponent("description"),

    // Metadata about props expected for PlasmicTextField
    internalVariantProps: PlasmicTextField__VariantProps,
    internalArgProps: PlasmicTextField__ArgProps
  }
);

export default PlasmicTextField;
/* prettier-ignore-end */
