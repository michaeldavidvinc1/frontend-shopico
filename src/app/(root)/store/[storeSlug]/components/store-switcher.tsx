"use client";

import {useState} from "react";
import {Dialog} from "@/components/ui/dialog";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {CheckIcon, ChevronsUpDownIcon, PlusCircleIcon} from "lucide-react";
import {Command, CommandEmpty, CommandInput, CommandList, CommandGroup, CommandItem, CommandSeparator} from "@/components/ui/command";

// interface StoreSwitcherProps {
//
// }

const groups = [
    {
        label: "Personal Account",
        teams: [
            {
                label: "Alicia Koch",
                value: "personal",
            },
        ],
    },
]

// : React.FC<StoreSwitcherProps>
type Team = (typeof groups)[number]["teams"][number]
const StoreSwitcher = () => {
    const [open, setOpen] = useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState<Team>(
        groups[0].teams[0]
    )
    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className={cn("w-[200px] justify-between")}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt=""
                                className="grayscale"
                            />
                        </Avatar>
                        {selectedTeam.label}
                        <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search store..." />
                        <CommandList>
                            <CommandEmpty>No team found.</CommandEmpty>
                            {groups.map((group) => (
                                <CommandGroup key={group.label} heading="Store">
                                    {group.teams.map((team) => (
                                        <CommandItem
                                            key={team.value}
                                            onSelect={() => {
                                                setSelectedTeam(team)
                                                setOpen(false)
                                            }}
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-5 w-5">
                                                <AvatarImage
                                                    src="https://github.com/shadcn.png"
                                                    alt=""
                                                    className="grayscale"
                                                />
                                                <AvatarFallback>SC</AvatarFallback>
                                            </Avatar>
                                            {team.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selectedTeam.value === team.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <CommandItem>
                                    <PlusCircleIcon className="mr-2 h-5 w-5" />
                                    Create Store
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </Dialog>
    )
}

export default StoreSwitcher