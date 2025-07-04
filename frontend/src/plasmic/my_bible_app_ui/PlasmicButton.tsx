/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 9ALKC1eSkKzzoBpvUcK3nT
// Component: _vmwDeegthF4

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

import { BaseButton } from "@plasmicpkgs/react-aria/skinny/registerButton";

import "@plasmicapp/react-web/lib/plasmic.css";
import "../defaultStyles.css"; // plasmic-import: global/defaultcss
import "../antd_5_hostless/plasmic.css"; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import "../plasmic_rich_components/plasmic.css"; // plasmic-import: jkU633o1Cz7HrJdwdxhVHk/projectcss
import "../library_tailwind_3_4_color_tokens/plasmic.css"; // plasmic-import: 5ZtnypMovRHeeP3YTdPCYL/projectcss
import "../library_tailwind_3_4_number_tokens/plasmic.css"; // plasmic-import: 4vjRXvnb4XuY6J15w9oRcQ/projectcss
import "../plasmic_login_page.css"; // plasmic-import: 9ALKC1eSkKzzoBpvUcK3nT/projectcss
import "./PlasmicButton.css"; // plasmic-import: _vmwDeegthF4/css

import CircleIcon from "./icons/PlasmicIcon__Circle"; // plasmic-import: sTVs6XRFORwY/icon
import ChevronDownIcon from "./icons/PlasmicIcon__ChevronDown"; // plasmic-import: fL-BBHiiIwf7/icon

createPlasmicElementProxy;

export type PlasmicButton__VariantMembers = {
  color: "neutral" | "muted" | "success" | "warning" | "errorDestructive";
  type: "soft" | "bordered";
  size: "extraSmall" | "small" | "large" | "extraLarge";
  iconStart: "iconStart";
  iconEnd: "iconEnd";
  roundedFull: "roundedFull";
  flatSide: "top" | "right" | "bottom" | "left";
};
export type PlasmicButton__VariantsArgs = {
  color?: SingleChoiceArg<
    "neutral" | "muted" | "success" | "warning" | "errorDestructive"
  >;
  type?: SingleChoiceArg<"soft" | "bordered">;
  size?: SingleChoiceArg<"extraSmall" | "small" | "large" | "extraLarge">;
  iconStart?: SingleBooleanChoiceArg<"iconStart">;
  iconEnd?: SingleBooleanChoiceArg<"iconEnd">;
  roundedFull?: SingleBooleanChoiceArg<"roundedFull">;
  flatSide?: MultiChoiceArg<"top" | "right" | "bottom" | "left">;
};
type VariantPropType = keyof PlasmicButton__VariantsArgs;
export const PlasmicButton__VariantProps = new Array<VariantPropType>(
  "color",
  "type",
  "size",
  "iconStart",
  "iconEnd",
  "roundedFull",
  "flatSide"
);

export type PlasmicButton__ArgsType = {
  disabled?: boolean;
  submitsForm?: boolean;
  resetsForm?: boolean;
  ariaLabel?: string;
  onClick?: (event: any) => void;
  linkTo?: string;
  openLinkInNewTab?: boolean;
  start?: React.ReactNode;
  label?: React.ReactNode;
  end?: React.ReactNode;
};
type ArgPropType = keyof PlasmicButton__ArgsType;
export const PlasmicButton__ArgProps = new Array<ArgPropType>(
  "disabled",
  "submitsForm",
  "resetsForm",
  "ariaLabel",
  "onClick",
  "linkTo",
  "openLinkInNewTab",
  "start",
  "label",
  "end"
);

export type PlasmicButton__OverridesType = {
  root?: Flex__<typeof BaseButton>;
  softBackground?: Flex__<"div">;
  border?: Flex__<"div">;
  interactionEffect?: Flex__<"div">;
};

export interface DefaultButtonProps {
  disabled?: boolean;
  submitsForm?: boolean;
  resetsForm?: boolean;
  ariaLabel?: string;
  onClick?: (event: any) => void;
  linkTo?: string;
  openLinkInNewTab?: boolean;
  start?: React.ReactNode;
  label?: React.ReactNode;
  end?: React.ReactNode;
  color?: SingleChoiceArg<
    "neutral" | "muted" | "success" | "warning" | "errorDestructive"
  >;
  type?: SingleChoiceArg<"soft" | "bordered">;
  size?: SingleChoiceArg<"extraSmall" | "small" | "large" | "extraLarge">;
  iconStart?: SingleBooleanChoiceArg<"iconStart">;
  iconEnd?: SingleBooleanChoiceArg<"iconEnd">;
  roundedFull?: SingleBooleanChoiceArg<"roundedFull">;
  flatSide?: MultiChoiceArg<"top" | "right" | "bottom" | "left">;
  className?: string;
}

const $$ = {};

function PlasmicButton__RenderFunc(props: {
  variants: PlasmicButton__VariantsArgs;
  args: PlasmicButton__ArgsType;
  overrides: PlasmicButton__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(
    () =>
      Object.assign(
        {
          linkTo: "",
          openLinkInNewTab: false
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
        path: "color",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.color
      },
      {
        path: "size",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.size
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
        path: "roundedFull",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.roundedFull
      },
      {
        path: "type",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.type
      },
      {
        path: "flatSide",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.flatSide
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
    disabled: false
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
    <BaseButton
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      aria-label={args.ariaLabel}
      className={classNames(
        "__wab_instance",
        "root_reset_9ALKC1eSkKzzoBpvUcK3nT",
        "plasmic_default_styles",
        "plasmic_mixins",
        "plasmic_tokens",
        "Button__root__xgbPs",
        {
          Button__rootcolor_errorDestructive__xgbPspzRJc: hasVariant(
            $state,
            "color",
            "errorDestructive"
          ),
          Button__rootcolor_muted__xgbPs3CIj: hasVariant(
            $state,
            "color",
            "muted"
          ),
          Button__rootcolor_muted_type_bordered__xgbPs3CIjRsVQ:
            hasVariant($state, "color", "muted") &&
            hasVariant($state, "type", "bordered"),
          Button__rootcolor_muted_type_soft__xgbPs3CIjZ1DKg:
            hasVariant($state, "color", "muted") &&
            hasVariant($state, "type", "soft"),
          Button__rootcolor_neutral__xgbPsrjuyc: hasVariant(
            $state,
            "color",
            "neutral"
          ),
          Button__rootcolor_success__xgbPso2CMc: hasVariant(
            $state,
            "color",
            "success"
          ),
          Button__rootcolor_warning__xgbPsPfgTi: hasVariant(
            $state,
            "color",
            "warning"
          ),
          Button__rootcolor_warning_type_bordered__xgbPsPfgTiRsVQ:
            hasVariant($state, "color", "warning") &&
            hasVariant($state, "type", "bordered"),
          Button__rootcolor_warning_type_soft__xgbPsPfgTiZ1DKg:
            hasVariant($state, "color", "warning") &&
            hasVariant($state, "type", "soft"),
          Button__rootflatSide_bottom__xgbPsYzphb: hasVariant(
            $state,
            "flatSide",
            "bottom"
          ),
          Button__rootflatSide_left__xgbPsOctxj: hasVariant(
            $state,
            "flatSide",
            "left"
          ),
          Button__rootflatSide_right__xgbPsTsNic: hasVariant(
            $state,
            "flatSide",
            "right"
          ),
          Button__rootflatSide_top__xgbPsrY4Aa: hasVariant(
            $state,
            "flatSide",
            "top"
          ),
          Button__rooticonEnd__xgbPs6BBj: hasVariant(
            $state,
            "iconEnd",
            "iconEnd"
          ),
          Button__rooticonStart__xgbPs785Ix: hasVariant(
            $state,
            "iconStart",
            "iconStart"
          ),
          Button__rootroundedFull__xgbPsClUgM: hasVariant(
            $state,
            "roundedFull",
            "roundedFull"
          ),
          Button__rootsize_extraLarge__xgbPsDd4HD: hasVariant(
            $state,
            "size",
            "extraLarge"
          ),
          Button__rootsize_extraSmall__xgbPs6Sg0O: hasVariant(
            $state,
            "size",
            "extraSmall"
          ),
          Button__rootsize_large__xgbPsBHgii: hasVariant(
            $state,
            "size",
            "large"
          ),
          Button__rootsize_small__xgbPsyOlM7: hasVariant(
            $state,
            "size",
            "small"
          ),
          Button__roottype_bordered__xgbPsRsVQ: hasVariant(
            $state,
            "type",
            "bordered"
          ),
          Button__roottype_bordered_color_errorDestructive__xgbPsRsVQPzRJc:
            hasVariant($state, "color", "errorDestructive") &&
            hasVariant($state, "type", "bordered"),
          Button__roottype_bordered_color_neutral__xgbPsRsVQRjuyc:
            hasVariant($state, "color", "neutral") &&
            hasVariant($state, "type", "bordered"),
          Button__roottype_bordered_color_success__xgbPsRsVQO2CMc:
            hasVariant($state, "color", "success") &&
            hasVariant($state, "type", "bordered"),
          Button__roottype_soft__xgbPsZ1DKg: hasVariant($state, "type", "soft"),
          Button__roottype_soft_color_errorDestructive__xgbPsZ1DKgPzRJc:
            hasVariant($state, "color", "errorDestructive") &&
            hasVariant($state, "type", "soft"),
          Button__roottype_soft_color_neutral__xgbPsZ1DKgRjuyc:
            hasVariant($state, "color", "neutral") &&
            hasVariant($state, "type", "soft"),
          Button__roottype_soft_color_success__xgbPsZ1DKgO2CMc:
            hasVariant($state, "color", "success") &&
            hasVariant($state, "type", "soft")
        }
      )}
      href={args.linkTo}
      isDisabled={args.disabled}
      onPress={args.onClick}
      plasmicUpdateVariant={updateVariant}
      resetsForm={args.resetsForm}
      submitsForm={args.submitsForm}
      target={(() => {
        try {
          return $props.openLinkInNewTab ? "_blank" : "_self";
        } catch (e) {
          if (
            e instanceof TypeError ||
            e?.plasmicType === "PlasmicUndefinedDataError"
          ) {
            return undefined;
          }
          throw e;
        }
      })()}
    >
      {(
        hasVariant($state, "type", "bordered") && $ccVariants["pressed"]
          ? true
          : hasVariant($state, "type", "bordered") && $ccVariants["hovered"]
          ? true
          : hasVariant($state, "type", "soft")
          ? true
          : false
      ) ? (
        <div
          data-plasmic-name={"softBackground"}
          data-plasmic-override={overrides.softBackground}
          className={classNames(
            "plasmic_default__all",
            "plasmic_default__div",
            "Button__softBackground__wuAtt",
            {
              Button__softBackgroundcolor_errorDestructive__wuAttpzRJc:
                hasVariant($state, "color", "errorDestructive"),
              Button__softBackgroundcolor_muted__wuAtt3CIj: hasVariant(
                $state,
                "color",
                "muted"
              ),
              Button__softBackgroundcolor_neutral__wuAttrjuyc: hasVariant(
                $state,
                "color",
                "neutral"
              ),
              Button__softBackgroundcolor_success__wuAtto2CMc: hasVariant(
                $state,
                "color",
                "success"
              ),
              Button__softBackgroundcolor_warning__wuAttPfgTi: hasVariant(
                $state,
                "color",
                "warning"
              ),
              Button__softBackgroundroundedFull__wuAttClUgM: hasVariant(
                $state,
                "roundedFull",
                "roundedFull"
              ),
              Button__softBackgroundsize_large__wuAttBHgii: hasVariant(
                $state,
                "size",
                "large"
              ),
              Button__softBackgroundtype_bordered__wuAttRsVQ: hasVariant(
                $state,
                "type",
                "bordered"
              ),
              Button__softBackgroundtype_soft__wuAttZ1DKg: hasVariant(
                $state,
                "type",
                "soft"
              )
            }
          )}
        />
      ) : null}
      {(hasVariant($state, "type", "bordered") ? true : false) ? (
        <div
          data-plasmic-name={"border"}
          data-plasmic-override={overrides.border}
          className={classNames(
            "plasmic_default__all",
            "plasmic_default__div",
            "Button__border__afzzK",
            {
              Button__bordercolor_errorDestructive__afzzKpzRJc: hasVariant(
                $state,
                "color",
                "errorDestructive"
              ),
              Button__bordercolor_muted__afzzK3CIj: hasVariant(
                $state,
                "color",
                "muted"
              ),
              Button__bordercolor_muted_type_bordered__afzzK3CIjRsVQ:
                hasVariant($state, "color", "muted") &&
                hasVariant($state, "type", "bordered"),
              Button__bordercolor_neutral__afzzKrjuyc: hasVariant(
                $state,
                "color",
                "neutral"
              ),
              Button__bordercolor_success__afzzKo2CMc: hasVariant(
                $state,
                "color",
                "success"
              ),
              Button__bordercolor_warning__afzzKPfgTi: hasVariant(
                $state,
                "color",
                "warning"
              ),
              Button__borderflatSide_bottom__afzzKYzphb: hasVariant(
                $state,
                "flatSide",
                "bottom"
              ),
              Button__borderflatSide_left__afzzKoctxj: hasVariant(
                $state,
                "flatSide",
                "left"
              ),
              Button__borderflatSide_right__afzzKTsNic: hasVariant(
                $state,
                "flatSide",
                "right"
              ),
              Button__borderflatSide_top__afzzKrY4Aa: hasVariant(
                $state,
                "flatSide",
                "top"
              ),
              Button__borderroundedFull__afzzKclUgM: hasVariant(
                $state,
                "roundedFull",
                "roundedFull"
              ),
              Button__bordersize_large__afzzKbHgii: hasVariant(
                $state,
                "size",
                "large"
              ),
              Button__bordertype_bordered__afzzKrsVQ: hasVariant(
                $state,
                "type",
                "bordered"
              ),
              Button__bordertype_soft__afzzKz1DKg: hasVariant(
                $state,
                "type",
                "soft"
              )
            }
          )}
        />
      ) : null}
      <div
        data-plasmic-name={"interactionEffect"}
        data-plasmic-override={overrides.interactionEffect}
        className={classNames(
          "plasmic_default__all",
          "plasmic_default__div",
          "Button__interactionEffect__q9ONe",
          {
            Button__interactionEffectcolor_errorDestructive__q9ONepzRJc:
              hasVariant($state, "color", "errorDestructive"),
            Button__interactionEffectcolor_muted__q9ONe3CIj: hasVariant(
              $state,
              "color",
              "muted"
            ),
            Button__interactionEffectcolor_neutral__q9ONerjuyc: hasVariant(
              $state,
              "color",
              "neutral"
            ),
            Button__interactionEffectcolor_success__q9ONeo2CMc: hasVariant(
              $state,
              "color",
              "success"
            ),
            Button__interactionEffectcolor_warning__q9ONePfgTi: hasVariant(
              $state,
              "color",
              "warning"
            ),
            Button__interactionEffectroundedFull__q9ONeClUgM: hasVariant(
              $state,
              "roundedFull",
              "roundedFull"
            ),
            Button__interactionEffectsize_large__q9ONeBHgii: hasVariant(
              $state,
              "size",
              "large"
            ),
            Button__interactionEffectsize_small__q9ONeyOlM7: hasVariant(
              $state,
              "size",
              "small"
            ),
            Button__interactionEffecttype_bordered__q9ONeRsVQ: hasVariant(
              $state,
              "type",
              "bordered"
            ),
            Button__interactionEffecttype_bordered_color_success__q9ONeRsVQO2CMc:
              hasVariant($state, "color", "success") &&
              hasVariant($state, "type", "bordered"),
            Button__interactionEffecttype_soft__q9ONeZ1DKg: hasVariant(
              $state,
              "type",
              "soft"
            )
          }
        )}
        style={
          hasVariant($state, "type", "bordered") && $ccVariants["pressed"]
            ? { display: "block" }
            : undefined
        }
      />

      <Stack__
        as={"div"}
        hasGap={true}
        className={classNames(
          "plasmic_default__all",
          "plasmic_default__div",
          "Button__freeBox__tMh9V",
          {
            Button__freeBoxcolor_neutral__tMh9Vrjuyc: hasVariant(
              $state,
              "color",
              "neutral"
            ),
            Button__freeBoxroundedFull__tMh9VClUgM: hasVariant(
              $state,
              "roundedFull",
              "roundedFull"
            ),
            Button__freeBoxsize_extraLarge__tMh9VDd4HD: hasVariant(
              $state,
              "size",
              "extraLarge"
            ),
            Button__freeBoxsize_extraSmall__tMh9V6Sg0O: hasVariant(
              $state,
              "size",
              "extraSmall"
            ),
            Button__freeBoxsize_large__tMh9VBHgii: hasVariant(
              $state,
              "size",
              "large"
            ),
            Button__freeBoxsize_small__tMh9VyOlM7: hasVariant(
              $state,
              "size",
              "small"
            ),
            Button__freeBoxtype_bordered__tMh9VRsVQ: hasVariant(
              $state,
              "type",
              "bordered"
            ),
            Button__freeBoxtype_bordered_color_success__tMh9VRsVQO2CMc:
              hasVariant($state, "color", "success") &&
              hasVariant($state, "type", "bordered")
          }
        )}
      >
        <div
          className={classNames(
            "plasmic_default__all",
            "plasmic_default__div",
            "Button__freeBox__bQv2Q",
            {
              Button__freeBoxcolor_neutral__bQv2Qrjuyc: hasVariant(
                $state,
                "color",
                "neutral"
              ),
              Button__freeBoxiconStart__bQv2Q785Ix: hasVariant(
                $state,
                "iconStart",
                "iconStart"
              ),
              Button__freeBoxsize_extraLarge__bQv2QDd4HD: hasVariant(
                $state,
                "size",
                "extraLarge"
              ),
              Button__freeBoxsize_large__bQv2QBHgii: hasVariant(
                $state,
                "size",
                "large"
              ),
              Button__freeBoxsize_small__bQv2QyOlM7: hasVariant(
                $state,
                "size",
                "small"
              ),
              Button__freeBoxtype_bordered__bQv2QRsVQ: hasVariant(
                $state,
                "type",
                "bordered"
              ),
              Button__freeBoxtype_soft_color_neutral__bQv2QZ1DKgRjuyc:
                hasVariant($state, "color", "neutral") &&
                hasVariant($state, "type", "soft")
            }
          )}
        >
          {renderPlasmicSlot({
            defaultContents: (
              <CircleIcon
                className={classNames(
                  "plasmic_default__all",
                  "plasmic_default__svg",
                  "Button__svg__xQoq7"
                )}
                role={"img"}
              />
            ),

            value: args.start,
            className: classNames("Button__slotTargetStart__nJKwQ", {
              Button__slotTargetStartcolor_errorDestructive__nJKwQpzRJc:
                hasVariant($state, "color", "errorDestructive"),
              Button__slotTargetStartcolor_muted__nJKwQ3CIj: hasVariant(
                $state,
                "color",
                "muted"
              ),
              Button__slotTargetStartcolor_muted_type_bordered__nJKwQ3CIjRsVQ:
                hasVariant($state, "color", "muted") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetStartcolor_muted_type_soft__nJKwQ3CIjZ1DKg:
                hasVariant($state, "color", "muted") &&
                hasVariant($state, "type", "soft"),
              Button__slotTargetStartcolor_neutral__nJKwQrjuyc: hasVariant(
                $state,
                "color",
                "neutral"
              ),
              Button__slotTargetStartcolor_success__nJKwQo2CMc: hasVariant(
                $state,
                "color",
                "success"
              ),
              Button__slotTargetStartcolor_warning__nJKwQPfgTi: hasVariant(
                $state,
                "color",
                "warning"
              ),
              Button__slotTargetStartcolor_warning_type_bordered__nJKwQPfgTiRsVQ:
                hasVariant($state, "color", "warning") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetStartcolor_warning_type_soft__nJKwQPfgTiZ1DKg:
                hasVariant($state, "color", "warning") &&
                hasVariant($state, "type", "soft"),
              Button__slotTargetStarticonStart__nJKwQ785Ix: hasVariant(
                $state,
                "iconStart",
                "iconStart"
              ),
              Button__slotTargetStartsize_extraLarge__nJKwQdd4HD: hasVariant(
                $state,
                "size",
                "extraLarge"
              ),
              Button__slotTargetStartsize_extraSmall__nJKwQ6Sg0O: hasVariant(
                $state,
                "size",
                "extraSmall"
              ),
              Button__slotTargetStartsize_large__nJKwQbHgii: hasVariant(
                $state,
                "size",
                "large"
              ),
              Button__slotTargetStartsize_small__nJKwQyOlM7: hasVariant(
                $state,
                "size",
                "small"
              ),
              Button__slotTargetStarttype_bordered__nJKwQrsVQ: hasVariant(
                $state,
                "type",
                "bordered"
              ),
              Button__slotTargetStarttype_bordered_color_errorDestructive__nJKwQrsVQPzRJc:
                hasVariant($state, "color", "errorDestructive") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetStarttype_bordered_color_neutral__nJKwQrsVQRjuyc:
                hasVariant($state, "color", "neutral") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetStarttype_bordered_color_success__nJKwQrsVQO2CMc:
                hasVariant($state, "color", "success") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetStarttype_soft__nJKwQz1DKg: hasVariant(
                $state,
                "type",
                "soft"
              ),
              Button__slotTargetStarttype_soft_color_errorDestructive__nJKwQz1DKgPzRJc:
                hasVariant($state, "color", "errorDestructive") &&
                hasVariant($state, "type", "soft"),
              Button__slotTargetStarttype_soft_color_neutral__nJKwQz1DKgRjuyc:
                hasVariant($state, "color", "neutral") &&
                hasVariant($state, "type", "soft"),
              Button__slotTargetStarttype_soft_color_success__nJKwQz1DKgO2CMc:
                hasVariant($state, "color", "success") &&
                hasVariant($state, "type", "soft")
            })
          })}
        </div>
        {renderPlasmicSlot({
          defaultContents: (
            <div
              className={classNames(
                "plasmic_default__all",
                "plasmic_default__div",
                "__wab_text",
                "Button__text__fehWr"
              )}
            >
              {"Text"}
            </div>
          ),
          value: args.label,
          className: classNames("Button__slotTargetLabel__q9U2K", {
            Button__slotTargetLabelcolor_errorDestructive__q9U2KpzRJc:
              hasVariant($state, "color", "errorDestructive"),
            Button__slotTargetLabelcolor_muted__q9U2K3CIj: hasVariant(
              $state,
              "color",
              "muted"
            ),
            Button__slotTargetLabelcolor_muted_type_bordered__q9U2K3CIjRsVQ:
              hasVariant($state, "color", "muted") &&
              hasVariant($state, "type", "bordered"),
            Button__slotTargetLabelcolor_muted_type_soft__q9U2K3CIjZ1DKg:
              hasVariant($state, "color", "muted") &&
              hasVariant($state, "type", "soft"),
            Button__slotTargetLabelcolor_neutral__q9U2Krjuyc: hasVariant(
              $state,
              "color",
              "neutral"
            ),
            Button__slotTargetLabelcolor_success__q9U2Ko2CMc: hasVariant(
              $state,
              "color",
              "success"
            ),
            Button__slotTargetLabelcolor_warning__q9U2KPfgTi: hasVariant(
              $state,
              "color",
              "warning"
            ),
            Button__slotTargetLabelcolor_warning_type_bordered__q9U2KPfgTiRsVQ:
              hasVariant($state, "color", "warning") &&
              hasVariant($state, "type", "bordered"),
            Button__slotTargetLabelcolor_warning_type_soft__q9U2KPfgTiZ1DKg:
              hasVariant($state, "color", "warning") &&
              hasVariant($state, "type", "soft"),
            Button__slotTargetLabeliconEnd__q9U2K6BBj: hasVariant(
              $state,
              "iconEnd",
              "iconEnd"
            ),
            Button__slotTargetLabeliconStart__q9U2K785Ix: hasVariant(
              $state,
              "iconStart",
              "iconStart"
            ),
            Button__slotTargetLabelsize_extraLarge__q9U2Kdd4HD: hasVariant(
              $state,
              "size",
              "extraLarge"
            ),
            Button__slotTargetLabelsize_extraSmall__q9U2K6Sg0O: hasVariant(
              $state,
              "size",
              "extraSmall"
            ),
            Button__slotTargetLabelsize_large__q9U2KbHgii: hasVariant(
              $state,
              "size",
              "large"
            ),
            Button__slotTargetLabelsize_small__q9U2KyOlM7: hasVariant(
              $state,
              "size",
              "small"
            ),
            Button__slotTargetLabeltype_bordered__q9U2KrsVQ: hasVariant(
              $state,
              "type",
              "bordered"
            ),
            Button__slotTargetLabeltype_bordered_color_errorDestructive__q9U2KrsVQPzRJc:
              hasVariant($state, "color", "errorDestructive") &&
              hasVariant($state, "type", "bordered"),
            Button__slotTargetLabeltype_bordered_color_neutral__q9U2KrsVQRjuyc:
              hasVariant($state, "color", "neutral") &&
              hasVariant($state, "type", "bordered"),
            Button__slotTargetLabeltype_bordered_color_success__q9U2KrsVQO2CMc:
              hasVariant($state, "color", "success") &&
              hasVariant($state, "type", "bordered"),
            Button__slotTargetLabeltype_soft__q9U2Kz1DKg: hasVariant(
              $state,
              "type",
              "soft"
            ),
            Button__slotTargetLabeltype_soft_color_errorDestructive__q9U2Kz1DKgPzRJc:
              hasVariant($state, "color", "errorDestructive") &&
              hasVariant($state, "type", "soft"),
            Button__slotTargetLabeltype_soft_color_neutral__q9U2Kz1DKgRjuyc:
              hasVariant($state, "color", "neutral") &&
              hasVariant($state, "type", "soft"),
            Button__slotTargetLabeltype_soft_color_success__q9U2Kz1DKgO2CMc:
              hasVariant($state, "color", "success") &&
              hasVariant($state, "type", "soft")
          })
        })}
        <div
          className={classNames(
            "plasmic_default__all",
            "plasmic_default__div",
            "Button__freeBox__rG1Mo",
            {
              Button__freeBoxiconEnd__rG1Mo6BBj: hasVariant(
                $state,
                "iconEnd",
                "iconEnd"
              ),
              Button__freeBoxsize_extraLarge__rG1Modd4HD: hasVariant(
                $state,
                "size",
                "extraLarge"
              ),
              Button__freeBoxsize_large__rG1MobHgii: hasVariant(
                $state,
                "size",
                "large"
              ),
              Button__freeBoxsize_small__rG1MOyOlM7: hasVariant(
                $state,
                "size",
                "small"
              )
            }
          )}
        >
          {renderPlasmicSlot({
            defaultContents: (
              <ChevronDownIcon
                className={classNames(
                  "plasmic_default__all",
                  "plasmic_default__svg",
                  "Button__svg__wdQyu"
                )}
                role={"img"}
              />
            ),

            value: args.end,
            className: classNames("Button__slotTargetEnd__niol7", {
              Button__slotTargetEndcolor_errorDestructive__niol7PzRJc:
                hasVariant($state, "color", "errorDestructive"),
              Button__slotTargetEndcolor_muted__niol73CIj: hasVariant(
                $state,
                "color",
                "muted"
              ),
              Button__slotTargetEndcolor_muted_type_bordered__niol73CIjRsVQ:
                hasVariant($state, "color", "muted") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetEndcolor_muted_type_soft__niol73CIjZ1DKg:
                hasVariant($state, "color", "muted") &&
                hasVariant($state, "type", "soft"),
              Button__slotTargetEndcolor_neutral__niol7Rjuyc: hasVariant(
                $state,
                "color",
                "neutral"
              ),
              Button__slotTargetEndcolor_success__niol7O2CMc: hasVariant(
                $state,
                "color",
                "success"
              ),
              Button__slotTargetEndcolor_warning__niol7PfgTi: hasVariant(
                $state,
                "color",
                "warning"
              ),
              Button__slotTargetEndcolor_warning_type_bordered__niol7PfgTiRsVQ:
                hasVariant($state, "color", "warning") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetEndcolor_warning_type_soft__niol7PfgTiZ1DKg:
                hasVariant($state, "color", "warning") &&
                hasVariant($state, "type", "soft"),
              Button__slotTargetEndiconEnd__niol76BBj: hasVariant(
                $state,
                "iconEnd",
                "iconEnd"
              ),
              Button__slotTargetEndiconStart__niol7785Ix: hasVariant(
                $state,
                "iconStart",
                "iconStart"
              ),
              Button__slotTargetEndsize_extraLarge__niol7Dd4HD: hasVariant(
                $state,
                "size",
                "extraLarge"
              ),
              Button__slotTargetEndsize_extraSmall__niol76Sg0O: hasVariant(
                $state,
                "size",
                "extraSmall"
              ),
              Button__slotTargetEndsize_large__niol7BHgii: hasVariant(
                $state,
                "size",
                "large"
              ),
              Button__slotTargetEndsize_small__niol7YOlM7: hasVariant(
                $state,
                "size",
                "small"
              ),
              Button__slotTargetEndtype_bordered__niol7RsVQ: hasVariant(
                $state,
                "type",
                "bordered"
              ),
              Button__slotTargetEndtype_bordered_color_errorDestructive__niol7RsVQPzRJc:
                hasVariant($state, "color", "errorDestructive") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetEndtype_bordered_color_neutral__niol7RsVQRjuyc:
                hasVariant($state, "color", "neutral") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetEndtype_bordered_color_success__niol7RsVQO2CMc:
                hasVariant($state, "color", "success") &&
                hasVariant($state, "type", "bordered"),
              Button__slotTargetEndtype_soft__niol7Z1DKg: hasVariant(
                $state,
                "type",
                "soft"
              ),
              Button__slotTargetEndtype_soft_color_errorDestructive__niol7Z1DKgPzRJc:
                hasVariant($state, "color", "errorDestructive") &&
                hasVariant($state, "type", "soft"),
              Button__slotTargetEndtype_soft_color_neutral__niol7Z1DKgRjuyc:
                hasVariant($state, "color", "neutral") &&
                hasVariant($state, "type", "soft"),
              Button__slotTargetEndtype_soft_color_success__niol7Z1DKgO2CMc:
                hasVariant($state, "color", "success") &&
                hasVariant($state, "type", "soft")
            })
          })}
        </div>
      </Stack__>
    </BaseButton>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "softBackground", "border", "interactionEffect"],
  softBackground: ["softBackground"],
  border: ["border"],
  interactionEffect: ["interactionEffect"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: typeof BaseButton;
  softBackground: "div";
  border: "div";
  interactionEffect: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicButton__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicButton__VariantsArgs;
    args?: PlasmicButton__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicButton__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicButton__ArgsType, ReservedPropsType> &
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
          internalArgPropNames: PlasmicButton__ArgProps,
          internalVariantPropNames: PlasmicButton__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicButton__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicButton";
  } else {
    func.displayName = `PlasmicButton.${nodeName}`;
  }
  return func;
}

export const PlasmicButton = Object.assign(
  // Top-level PlasmicButton renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    softBackground: makeNodeComponent("softBackground"),
    border: makeNodeComponent("border"),
    interactionEffect: makeNodeComponent("interactionEffect"),

    // Metadata about props expected for PlasmicButton
    internalVariantProps: PlasmicButton__VariantProps,
    internalArgProps: PlasmicButton__ArgProps
  }
);

export default PlasmicButton;
/* prettier-ignore-end */
