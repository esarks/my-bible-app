/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 9ALKC1eSkKzzoBpvUcK3nT
// Component: jwxXIvnGGMuw

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

import { BaseSwitch } from "@plasmicpkgs/react-aria/skinny/registerSwitch";
import Description from "../../components/Description"; // plasmic-import: 6AmSVyeMyGPY/component

import "@plasmicapp/react-web/lib/plasmic.css";
import "../defaultStyles.css"; // plasmic-import: global/defaultcss
import "../antd_5_hostless/plasmic.css"; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import "../plasmic_rich_components/plasmic.css"; // plasmic-import: jkU633o1Cz7HrJdwdxhVHk/projectcss
import "../library_tailwind_3_4_color_tokens/plasmic.css"; // plasmic-import: 5ZtnypMovRHeeP3YTdPCYL/projectcss
import "../library_tailwind_3_4_number_tokens/plasmic.css"; // plasmic-import: 4vjRXvnb4XuY6J15w9oRcQ/projectcss
import "../plasmic_login_page.css"; // plasmic-import: 9ALKC1eSkKzzoBpvUcK3nT/projectcss
import "./PlasmicSwitch.css"; // plasmic-import: jwxXIvnGGMuw/css

createPlasmicElementProxy;

export type PlasmicSwitch__VariantMembers = {};
export type PlasmicSwitch__VariantsArgs = {};
type VariantPropType = keyof PlasmicSwitch__VariantsArgs;
export const PlasmicSwitch__VariantProps = new Array<VariantPropType>();

export type PlasmicSwitch__ArgsType = {
  showLabel?: boolean;
  showDescription?: boolean;
  autoFocus?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  ariaLabel?: string;
  onChange?: (val: boolean) => void;
  label?: React.ReactNode;
};
type ArgPropType = keyof PlasmicSwitch__ArgsType;
export const PlasmicSwitch__ArgProps = new Array<ArgPropType>(
  "showLabel",
  "showDescription",
  "autoFocus",
  "isSelected",
  "disabled",
  "readOnly",
  "ariaLabel",
  "onChange",
  "label"
);

export type PlasmicSwitch__OverridesType = {
  ariaSwitch?: Flex__<typeof BaseSwitch>;
  freeBox?: Flex__<"div">;
  switchIndicator?: Flex__<"div">;
  thumb?: Flex__<"div">;
  description?: Flex__<typeof Description>;
};

export interface DefaultSwitchProps {
  showLabel?: boolean;
  showDescription?: boolean;
  autoFocus?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  ariaLabel?: string;
  onChange?: (val: boolean) => void;
  label?: React.ReactNode;
  className?: string;
}

const $$ = {};

function PlasmicSwitch__RenderFunc(props: {
  variants: PlasmicSwitch__VariantsArgs;
  args: PlasmicSwitch__ArgsType;
  overrides: PlasmicSwitch__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(
    () =>
      Object.assign(
        {
          showLabel: true,
          showDescription: false,
          autoFocus: false,
          disabled: false
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
        path: "ariaSwitch.isSelected",
        type: "writable",
        variableType: "boolean",

        valueProp: "isSelected",
        onChangeProp: "onChange"
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
    hovered: false,
    pressed: false,
    focused: false,
    focusVisible: false,
    selected: false,
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
    <BaseSwitch
      data-plasmic-name={"ariaSwitch"}
      data-plasmic-override={overrides.ariaSwitch}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      aria-label={args.ariaLabel}
      autoFocus={args.autoFocus}
      className={classNames(
        "__wab_instance",
        "root_reset_9ALKC1eSkKzzoBpvUcK3nT",
        "plasmic_default_styles",
        "plasmic_mixins",
        "plasmic_tokens",
        "Switch__ariaSwitch__cKj7Q"
      )}
      isDisabled={args.disabled}
      isReadOnly={args.readOnly}
      isSelected={generateStateValueProp($state, ["ariaSwitch", "isSelected"])}
      onChange={async (...eventArgs: any) => {
        generateStateOnChangeProp($state, ["ariaSwitch", "isSelected"]).apply(
          null,
          eventArgs
        );
      }}
      plasmicUpdateVariant={updateVariant}
    >
      <Stack__
        as={"div"}
        data-plasmic-name={"freeBox"}
        data-plasmic-override={overrides.freeBox}
        hasGap={true}
        className={classNames(
          "plasmic_default__all",
          "plasmic_default__div",
          "Switch__freeBox__e0GMt"
        )}
      >
        <div
          data-plasmic-name={"switchIndicator"}
          data-plasmic-override={overrides.switchIndicator}
          className={classNames(
            "plasmic_default__all",
            "plasmic_default__div",
            "Switch__switchIndicator__qxUl9"
          )}
        >
          <div
            data-plasmic-name={"thumb"}
            data-plasmic-override={overrides.thumb}
            className={classNames(
              "plasmic_default__all",
              "plasmic_default__div",
              "Switch__thumb__bzzqu"
            )}
          />
        </div>
        {$props.showLabel
          ? renderPlasmicSlot({
              defaultContents: "Label",
              value: args.label
            })
          : null}
      </Stack__>
      {$props.showDescription ? (
        <Description
          data-plasmic-name={"description"}
          data-plasmic-override={overrides.description}
          className={classNames(
            "__wab_instance",
            "Switch__description___27BWt"
          )}
        />
      ) : null}
    </BaseSwitch>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  ariaSwitch: [
    "ariaSwitch",
    "freeBox",
    "switchIndicator",
    "thumb",
    "description"
  ],
  freeBox: ["freeBox", "switchIndicator", "thumb"],
  switchIndicator: ["switchIndicator", "thumb"],
  thumb: ["thumb"],
  description: ["description"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  ariaSwitch: typeof BaseSwitch;
  freeBox: "div";
  switchIndicator: "div";
  thumb: "div";
  description: typeof Description;
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicSwitch__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicSwitch__VariantsArgs;
    args?: PlasmicSwitch__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicSwitch__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicSwitch__ArgsType, ReservedPropsType> &
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
          internalArgPropNames: PlasmicSwitch__ArgProps,
          internalVariantPropNames: PlasmicSwitch__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicSwitch__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "ariaSwitch") {
    func.displayName = "PlasmicSwitch";
  } else {
    func.displayName = `PlasmicSwitch.${nodeName}`;
  }
  return func;
}

export const PlasmicSwitch = Object.assign(
  // Top-level PlasmicSwitch renders the root element
  makeNodeComponent("ariaSwitch"),
  {
    // Helper components rendering sub-elements
    freeBox: makeNodeComponent("freeBox"),
    switchIndicator: makeNodeComponent("switchIndicator"),
    thumb: makeNodeComponent("thumb"),
    description: makeNodeComponent("description"),

    // Metadata about props expected for PlasmicSwitch
    internalVariantProps: PlasmicSwitch__VariantProps,
    internalArgProps: PlasmicSwitch__ArgProps
  }
);

export default PlasmicSwitch;
/* prettier-ignore-end */
