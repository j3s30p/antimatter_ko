import { automatorTemplates } from "../script-templates";

export const automator = {
  categoryNames: [
    "Time Studies",
    "Event Triggers",
    "Alter Settings",
    "Information",
    "Script Flow",
  ],
  commands: [
    {
      id: 0,
      isUnlocked: () => true,
      keyword: "STUDIES RESPEC",
      category: 0,
      syntax: `<b>studies respec</b>`,
      description: `이 명령어는 재설정 옵션을 켜서 다음 수동 또는 자동 영원에서 시간 연구를 재설정합니다.
        이 명령어만으로 영원을 실행하지는 않으므로 자동구매기가 켜져 있는지 확인하거나 ETERNITY 명령어를
        직접 실행하세요(ETERNITY에도 자체 재설정 옵션이 있습니다).`,
      examples: [
        `studies respec`,
      ]
    },
    {
      id: 1,
      isUnlocked: () => true,
      keyword: "STUDIES LOAD",
      category: 0,
      syntax: `<b>studies</b> [nowait] <b>load id</b> <u>selector</u><br>
        <b>studies</b> [nowait] <b>load name</b> <u>name</u>`,
      description: `시간 연구 탭의 버튼을 누른 것처럼 시간 연구 프리셋을 불러옵니다.`,
      sections: [
        {
          name: "INPUTS",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                If present, the Automator will purchase as many studies as possible before continuing onward. By default
                (ie. without "nowait") this command will repeat this line indefinitely until all of the studies in the
                preset are bought; this may cause the Automator to get stuck indefinitely if you are not careful.
              `
            },
            {
              header: "<i>selector</i>",
              description: `
                Finds and loads the specified Time Study preset by its slot number. This is numbered one through six,
                ordered from left to right.`
            },
            {
              header: "<i>name</i>",
              description: "Finds and loads the specified Time Study preset by its given name. This is case-sensitive."
            },
          ]
        }
      ],
      examples: [
        `studies load id 2`,
        `studies load name ANTI`,
        `studies nowait load name dil`,
      ]
    },
    {
      id: 2,
      isUnlocked: () => true,
      keyword: "STUDIES PURCHASE",
      category: 0,
      syntax: `<b>studies</b> [nowait] <b>purchase <u>study_list</u></b>`,
      description: "시간 연구 목록에 지정된 시간 연구를 구매합니다.",
      sections: [
        {
          name: "INPUTS",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                If present, the Automator will purchase as many studies as possible before continuing onward. By default
                (ie. without "nowait") this command will repeat this line indefinitely until all of the studies in the
                preset are bought; this may cause the Automator to get stuck indefinitely if you are not careful.
              `
            },
            {
              header: "<i>study_list</i>",
              description: `
                The exported Time Study tree format is supported here, which is simply a list of Time Study IDs
                separated by commas. This command also supports a more flexible formatting, additionally allowing
                ranges of studies (for example, <u>11-62</u>) and the following aliases:<br>
                <blockquote><b>antimatter, infinity, time, active, passive, idle, light, dark</b></blockquote>
                A variable name may be used in place of the entire Time Study list as well (see the definition panel),
                although in that case the shorthand ranges and aliases are not allowed.`
            },
          ]
        }
      ],
      examples: [
        "studies nowait purchase 11,21,31",
        "studies purchase 11-62, antimatter, 111, idle",
        "studies nowait purchase ec6Studies",
      ]
    },
    {
      id: 3,
      isUnlocked: () => true,
      keyword: "PRESTIGE",
      category: 1,
      syntax: `
        <b>infinity</b> [nowait]<br>
        <b>eternity</b> [nowait] [respec]<br>
        <b>reality</b> [nowait] [respec]`,
      description: `Triggers an Infinity, Eternity, or Reality reset if possible, otherwise the automator will wait at
        this command until it becomes possible. If you find that your script often gets stuck on this command, an
        Autobuyer may be triggering a prestige before the Automator reaches this line - consider using <i>nowait</i> or
        adjusting your Autobuyer settings using AUTO.`,
      sections: [
        {
          name: "MODIFIERS",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                If present, the Automator will move on to the next command instead of repeatedly trying on this
                command in situations where the prestige is not possible (eg. within an EC below the goal).
              `
            },
            {
              header: "<i>respec</i>",
              description: `
                For non-Infinity prestiges, also does the related respec action when triggering prestige.
                Eternity: Respec Time Studies and Eternity.<br>
                Reality: Unequip Glyphs and Reality.
              `
            },
          ]
        }
      ],
      examples: [
        "infinity",
        "eternity respec",
        "reality nowait",
      ]
    },
    {
      id: 4,
      isUnlocked: () => true,
      keyword: "UNLOCK",
      category: 1,
      syntax: "<b>unlock</b> [nowait] <u>feature</u>",
      description: "지정한 영원 도전 또는 시간 팽창을 해금합니다.",
      sections: [
        {
          name: "MODIFIERS",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                If present, the Automator will move on to the next command even if unlocking the feature fails. By
                default, the Automator will keep running this command until the unlock succeeds.
              `
            },
          ]
        }
      ],
      examples: [
        "unlock dilation",
        "unlock ec7"
      ]
    },
    {
      id: 5,
      isUnlocked: () => true,
      keyword: "START",
      category: 1,
      syntax: `
        <b>start</b> ec<u>N</u><br>
        <b>start</b> dilation`,
      description: `지정한 영원 도전 또는 팽창된 영원을 시작합니다. 영원 도전이 해금되지 않았다면 이 명령어가
        해금도 시도하지만 시간 팽창은 해금하지 않습니다(해금하려면 UNLOCK 명령어를 사용하세요).
        이미 지정한 영원 도전 또는 팽창된 영원에 있다면 이 명령어를 다시 실행해도 아무 일도 일어나지 않습니다.
        그 외에는 성공할 때까지 오토메이터가 영원 시작을 계속 시도합니다.`,
      examples: [
        "start ec12",
        "start dilation"
      ]
    },
    {
      id: 6,
      isUnlocked: () => true,
      keyword: "AUTO",
      category: 2,
      syntax: `<b>auto infinity</b> [setting]<br>
        <b>auto eternity</b> [setting]<br>
        <b>auto reality</b> [setting]`,
      description: `프레스티지 자동구매기를 켜거나 끄고 설정을 변경합니다. 설정 옵션이 없으면 이 명령어가
        자동구매기의 상태를 전환하여, 켜져 있으면 끄고 꺼져 있으면 켭니다. <b>보유하지 않은 자동구매기나
        설정을 변경하려 하면 이 명령어는 작동하지 않습니다.</b>`,
      sections: [
        {
          name: "SETTINGS",
          items: [
            {
              header: "<i>on</i> | <i>off</i>",
              description: "Turns specified Autobuyer on or off.",
            },
            {
              header: "<u><i>number</i></u> <u><i>time units</i></u>",
              description: `Usable with Infinity and Eternity only.
                Turns the Autobuyer on and set it to trigger at the given interval.`
            },
            {
              header: "<u><i>number</i></u> x highest",
              description: `Usable with Infinity and Eternity only. Turns the Autobuyer on and sets it to
                "X times highest" mode.`
            },
            {
              header: "<i><u>number</u> <u>currency</u></i>",
              description: `Turns the Autobuyer on and sets it to trigger at a specific amount. The currency must
                match the autobuyer type (IP, EP, or RM). This will select "Reality Machines" mode for the Reality
                Autobuyer. Glyph Level mode cannot be changed or set via the Automator, only manually.`,
            },
          ]
        }
      ],
      examples: [
        "auto infinity on",
        "auto eternity off",
        "auto infinity 30s",
        "auto eternity 10 seconds",
        "auto eternity 1e100 x highest"
      ]
    },
    {
      id: 7,
      isUnlocked: () => BlackHole(1).isUnlocked,
      keyword: "BLACK HOLE",
      category: 2,
      syntax: "<b>black hole</b> <u>state</u>",
      description: `블랙홀의 가속 효과를 켜거나 끕니다. 오토메이터로 블랙홀을 켜도 블랙홀이 영구화되기 전에
        꺼진 상태에서 최대 속도까지 서서히 가속되는 과정은 건너뛰지 않습니다.`,
      examples: [
        "black hole on",
        "black hole off",
      ]
    },
    {
      id: 8,
      isUnlocked: () => Enslaved.isUnlocked,
      keyword: "STORE GAME TIME",
      category: 2,
      syntax: "<b>store game time</b> <u>action</u>",
      description: `블랙홀이 시간을 저장할지 설정합니다. 저장한 시간을 사용할 수도 있습니다.`,
      sections: [
        {
          name: "ACTIONS",
          items: [
            {
              header: "<i>on</i> | <i>off</i>",
              description: `
                Turns storing game time on or off.
              `
            },
            {
              header: "<i>use</i>",
              description: `
                Uses all stored game time. Does not alter the on/off state of time storage.
              `
            }
          ]
        }
      ],
      examples: [
        "store game time on",
        "store game time off",
        "store game time use",
      ]
    },
    {
      id: 9,
      isUnlocked: () => true,
      keyword: "NOTIFY",
      category: 3,
      syntax: "<b>notify</b> \"<u>text</u>\"",
      description: `지정한 문구를 우측 상단에 텍스트 알림으로 표시합니다. 자동 저장이나 도전과제/업그레이드
        해금 알림과 같은 위치와 형식으로 표시됩니다. 오토메이터 탭이 아닌 다른 탭에서도 오토메이터의
        상태를 확인할 때 유용합니다.`,
      examples: [
        "notify \"Dilation reached\"",
        "notify \"ECs completed\""
      ]
    },
    {
      id: 10,
      isUnlocked: () => true,
      keyword: "Adding Comments",
      category: 3,
      syntax: "<b>#</b> text<br><b>//</b> text",
      description: `스크립트 안에 자신을 위한 메모를 남길 수 있습니다. 명령어만 나열하는 것보다 읽기 쉽게
        정리하거나 스크립트의 각 부분이 어떤 일을 하는지 기록하는 데 유용합니다. 이 명령어들은 원하는 경우
        스크립트의 단계를 더 쉽게 파악하도록 돕는 도구입니다.`,
      sections: [
        {
          name: "NOTES",
          items: [
            {
              header: "<i>Inline comments</i>",
              description: `
                The Automator does not support comments which are placed after an already functional
                line of code, on the same line. As an example, the single line "studies load name TDI // Load push"
                will be an invalid command. In this case, you will need to move the comment to a separate line
                in the automator.
              `
            },
            {
              header: "<i>Execution speed</i>",
              description: `
                Having comments will not slow down your script, as they are completely skipped during
                execution and do not count as a command for the purposes of running. For example, even if you have
                a really long explanation in the form of comments on lines 20-40, the Automator will still
                <i>immediately</i> skip from line 19 to 41 during execution.
              `
            },
          ]
        }
      ],
      examples: [
        "# get 1e20 before starting ec1",
        "// this loop alternates dilation and pushing"
      ]
    },
    {
      id: 11,
      isUnlocked: () => true,
      keyword: "WAIT",
      category: 4,
      syntax: "<b>wait</b> <u>condition</u>",
      description: `오토메이터가 특정 조건이나 이벤트를 기다리게 합니다. 일정 시간 동안 기다리려면
        PAUSE 명령어를 사용하세요.`,
      sections: [
        {
          name: "POSSIBLE CONDITIONS",
          items: [
            {
              header: "<i>comparison</i>",
              description: `
                Wait until the comparison statement is true. Check the entry for "Formatting Comparisons" for details
                on how to properly input this option.
              `
            },
            {
              header: "<i>prestige</i>",
              description: `
                Wait until the specified prestige (Infinity, Eternity, or Reality) has been triggered by its respective
                Autobuyer. This must happen <i>after</i> this command is reached; if the Autobuyer triggers
                <i>before</i> the command is reached, your script may get stuck.
              `
            },
            {
              header: "<i>black hole (state)</i>",
              description: `
                Wait until the Black Hole(s) are in the specified state. Valid inputs for state are
                "off", "bh1", and "bh2", corresponding to no active Black Hole(s), at least the first Black Hole active,
                and both Black Holes active.
              `
            }
          ]
        }
      ],
      examples: [
        "wait am >= 1e308",
        "wait pending completions >= 5",
        "wait ec9 completions >= 4",
        "wait infinity",
        "wait black hole bh1",
      ]
    },
    {
      id: 12,
      isUnlocked: () => true,
      keyword: "PAUSE",
      category: 4,
      syntax: "<b>pause</b> <u>interval</u>",
      description: `오토메이터가 일정 시간 동안 다음으로 넘어가거나 명령어를 실행하지 않게 합니다.
        일시 정지 시간이 오토메이터의 실행 간격보다 짧으면 다음 실행 틱까지 기다린 뒤 넘어갑니다.`,
      examples: [
        "pause 10s",
        "pause 1 minute",
        "pause 34 seconds"
      ],
      sections: [
        {
          name: "INTERVAL FORMATTING",
          items: [
            {
              header: "<i>Specified Interval</i>",
              description: `This command accepts time units of milliseconds ("ms"), seconds ("s", "sec", or "seconds"),
                minutes ("m", "min", or "minutes"), and hours ("h" or "hours"). You cannot provide just a number and
                nothing else; a unit of time must be specified.`,
            },
            {
              header: "<i>Defined Constant</i>",
              description: `A defined constant may be used instead, see the definition panel. The defined value will
                be assumed to be in units of seconds.`
            },
          ]
        },
        {
          name: "OTHER",
          items: [
            {
              header: "<i>Offline Side-effects</i>",
              description: `This command may behave undesirably when it runs during offline progress due to limited
                tick count. A 1-second pause that is usually 20-30 ticks might be only 1 game tick when processing
                hours of offline progress, which might not be enough for the resources needed for the rest of the
                script.`,
            },
            {
              header: "<i>Alternatives</i>",
              description: `Using another command like 'WAIT' will allow you to set it for a certain resource amount,
                in order to ensure that the game has the proper state before moving onward.`
            },
            {
              header: "<i>Manual Skip</i>",
              description: `You can manually force the Automator to continue execution past a PAUSE command without
                waiting the entire specified time by stepping forward one line (to put it on the next one) and then
                resuming execution. If you find yourself doing this regularly, consider modifying your script.`
            }
          ]
        }
      ]
    },
    {
      id: 13,
      isUnlocked: () => true,
      keyword: "IF",
      category: 4,
      syntax: `<b>if</b> <u>condition</u> {<br>
        <blockquote>commands</blockquote>
        }`,
      description: `이 줄에 도달했을 때 지정한 비교식이 참인 경우에만 실행되는 오토메이터 스크립트의 내부 블록을
        정의합니다. 비교식이 거짓이면 오토메이터는 블록 다음의 첫 줄로 건너뛰어 그곳부터 실행을 계속합니다.`,
      examples: [
        "if ec10 completions < 5",
        "if ep > 1e6000"
      ]
    },
    {
      id: 14,
      isUnlocked: () => true,
      keyword: "UNTIL",
      category: 4,
      syntax: `<b>until</b> <u>comparison</u> {<br>
        <blockquote>commands</blockquote>
        }<br><b>until</b> <u>prestige_event</u> {<br>
          <blockquote>commands</blockquote>
        }`,
      description: `명령어를 반복하는 스크립트 내부 블록을 정의합니다. 시작할 때와 루프가 반복될 때마다 비교식을
        확인합니다. UNTIL 문에 처음 도달했을 때 조건이 참이면 내부 명령어 블록을 완전히 건너뜁니다.
        <br><br>
        조건 대신 프레스티지 이벤트(즉, 무한, 영원 또는 현실)를 지정하면 항상 블록에 진입하고, 블록에 들어간
        <i>후</i> 해당 이벤트가 처음 발생할 때까지 내부 명령어를 반복합니다. 프레스티지 이벤트가 발생해도
        루프 중간에 즉시 나가지 않고 오토메이터가 루프의 나머지를 마친 다음 빠져나갑니다.`,
      examples: [
        "until ep > 1e500",
        "until reality",
      ]
    },
    {
      id: 15,
      isUnlocked: () => true,
      keyword: "WHILE",
      category: 4,
      syntax: `<b>while</b> <u>comparison</u> {<br>
        <blockquote>commands</blockquote>
      }`,
      description: `명령어를 반복하는 스크립트 내부 블록을 정의합니다. 시작할 때와 루프가 반복될 때마다 비교식을
        확인합니다. WHILE 문에 처음 도달했을 때 조건이 거짓이면 내부 명령어 블록을 완전히 건너뜁니다.`,
      examples: [
        `while ep < 1e500`,
        `while myThreshold > am`,
      ]
    },
    {
      id: 16,
      isUnlocked: () => true,
      keyword: "STOP",
      category: 4,
      syntax: `<b>stop</b>`,
      description: `오토메이터가 이 줄을 실행하면 오토메이터 좌측 상단 제어 패널의
        <i class="fas fa-stop"></i> 버튼을 누른 것처럼 실행을 멈춥니다. 왼쪽 패널의
        <i class="fas fa-sync-alt"></i> 옵션을 끄면 자동으로 멈추므로 모든 스크립트 끝에 이 명령어를
        배치할 필요는 없습니다. 특정 조건에서만 실행을 멈추고 싶다면 IF 명령어 안에서 유용하게 사용할 수 있습니다.`,
      examples: [
        `stop`,
      ]
    },
    {
      id: 17,
      isUnlocked: () => true,
      keyword: "Currency List",
      category: 4,
      syntax: "<i>You can use these in any IF, WHILE, UNTIL, or WAIT command</i>",
      description: () => {
        const filterText = EffarigUnlock.glyphFilter.isUnlocked
          ? `<b>filter score</b> - Glyph filter score of the Glyph which your filter will select this Reality<br>`
          : "";
        const stText = V.spaceTheorems > 0
          ? `<b>space theorems</b> - Current unspent Space Theorem amount<br>
            <b>total space theorems</b> - TOTAL Space Theorems, including ones spent on current Studies<br>`
          : "";
        return `This is a list of "currencies" or numbers that you can use within the Automator.<br>
          Note that when used, most currencies will need to be in scientific notation.<br>
          <b>am</b> - Current Antimatter amount  <br>
          <b>ip</b> - Current Infinity Point amount  <br>
          <b>ep</b> - Current Eternity Point amount  <br>
          <b>rm</b> - Current Reality Machine amount  <br>
          <b>infinities</b> - Current Infinity amount <br>
          <b>banked infinities</b> - Current Banked Infinity amount <br>
          <b>eternities</b> - Current Eternity amount <br>
          <b>realities</b> - Current Reality amount <br>
          <b>pending ip</b> - IP gained on Infinity (0 if not available)<br>
          <b>pending ep</b> - EP gained on Eternity (0 if not available)<br>
          <b>pending tp</b> - TP gained on exiting Dilation<br>
          <b>pending rm</b> - RM gained on Reality (0 if not available)<br>
          <b>pending glyph level</b> - Glyph Level gained on Reality (0 if not available)<br>
          <b>dt</b> - Current Dilated Time amount <br>
          <b>tp</b> - Current Tachyon Particle amount<br>
          <b>rg</b> - Current Replicanti Galaxy amount (does not use scientific)<br>
          <b>rep</b> - Current Replicanti amount <br>
          <b>tt</b> - Current Time Theorem amount <br>
          <b>total tt</b> - TOTAL Time Theorems, includes all forms of generated TT and any spent on Studies <br>
          <b>spent tt</b> - Time Theorems currently spent on all Time Studies <br>
          <b>total completions</b> - Total completions of all Eternity Challenges <br>
          <b>pending completions</b> - Total completions of current EC at Eternity <br>
          <b>ec<u>X</u> completions</b> - Amount of EC completions for a certain EC (eg. "ec6 completions")<br>
          ${filterText}
          ${stText}
        `;
      }
    },
    {
      id: 18,
      isUnlocked: () => true,
      keyword: "Formatting Comparisons",
      category: 4,
      syntax: "<u>resource1</u> <u>condition</u> <u>resource2</u>",
      description: `
        비교식은 특정 명령어 안에서 사용되며, 게임의 현재 상태에 따라 오토메이터의 동작을 제어할 수 있게 합니다.
        두 값과 비교 연산자로 이루어진 표준 형식을 사용하지만, 전체 형식만 올바르면 값에는 무엇이든 입력할 수 있습니다.`,
      sections: [
        {
          name: "CONDITIONS",
          items: [
            {
              header: "<i>resource</i>",
              description: `
                This can be any Automator Currency, a defined constant, or a number which must be formatted in
                scientific notation (eg. 1000, 1e100, 1.8e308). Unlike more general programming languages, this must
                be a single value (ie. math expressions such as "ip + pending ip" are not allowed).
              `
            },
            {
              header: "<i>condition</i>",
              description: `
                This must be an inequality operator (<, <=, >, >=), which takes on its typical mathematical meaning.
                Equality operators (==, !=) are not allowed, as the nature of the game means that numbers will often
                never be exactly equal and thus checking based on direct equality may lead to unexpected script
                behavior.
              `
            },
          ]
        }
      ],
      examples: [
        "ep < 1e20",
        "total tt > 14000",
      ]
    },
    {
      id: 19,
      isUnlocked: () => true,
      keyword: "Commands with inner blocks",
      category: 4,
      syntax: `<b>header_command</b> {<br>
        <blockquote>inner_commands</blockquote>
        }`,
      description: `일부 명령어에는 명령어의 "내부 블록"이 연결됩니다. 내부 블록에는 다른 유효한 명령어를
        모두 넣을 수 있지만, <b>header_command</b>가 실행될 때의 게임 상태에 따라 실제로 실행될 수도 있고
        실행되지 않을 수도 있습니다. 이를 통해 일부 명령어를 계속 반복하거나(예: 시간 연구 구매), 완전히
        건너뛸 수 있습니다(예: 이미 완료 횟수를 모두 채운 영원 도전에 진입하지 않음). 블록 안에 다른 내부
        블록을 배치하여 중첩할 수도 있습니다.
        <br><br>
        텍스트 편집기 모드: 중괄호로 내부 블록을 지정합니다. 여는 중괄호 {는 비교식과 같은 줄에 두고,
        닫는 중괄호 }는 블록에 넣을 마지막 줄 다음의 별도 줄에 둡니다. 내부 명령어를 들여쓸 필요는 없지만,
        들여쓰면 시각적으로 알아보기 쉬울 수 있습니다.
        <br><br>
        블록 편집기 모드: 이 명령어에는 어떤 명령어가 내부 블록에 속하는지 나타내는 빈 점선 사각형이 함께
        표시됩니다. 이후 블록을 점선 사각형 안으로 끌어 놓을 수 있습니다.
        `,
      examples: [
        `if ec10 completions < 5 {<br>
          <blockquote>
          unlock ec10<br>
          start ec10</blockquote>
        }`,
        `until ep > 1e8 {<br>
          <blockquote>
          studies nowait purchase 11-62<br>
          pause 10s<br>
          eternity respec</blockquote>
        }`
      ]
    },
  ],
  otherAutomatorPoints: [
    {
      name: "Reality Count",
      automatorPoints: () => 2 * Math.clampMax(Currency.realities.value, 50),
      shortDescription: () => `+${formatInt(2)} per Reality, up to ${formatInt(50)} Realities`,
      symbol: "Ϟ",
    },
    {
      name: "Black Hole",
      automatorPoints: () => (BlackHole(1).isUnlocked ? 10 : 0),
      shortDescription: () => `Unlocking gives ${formatInt(10)} AP`,
      symbol: "<i class='fas fa-circle'></i>",
    },
  ],
  templates: automatorTemplates
};
