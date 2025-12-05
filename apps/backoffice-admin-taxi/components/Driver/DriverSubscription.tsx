"use client"




import { IconBook, IconMail, IconPhoneCall, IconUser } from "@tabler/icons-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { usePartialState, useQueryInvalidator, useUtils } from "@/hooks/hooks";
// import GenerateHumanPassword from "@/functions/GenerateHumanPassword";
import { ChevronDownIcon, MapPinIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "../DatePicker/DatePicker";
import FileUpload from "../FileUpload/FileUpload";
import { Combobox } from "../Combobox/Combobox";
import QUERY_KEYS from "@/lib/QUERY_KEYS";
import { Spinner } from "../ui/spinner";
// import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import API from "@/lib/API";




export default function DriverSubscription() {
    const { country } = useUtils();
    const Invalidator = useQueryInvalidator();
    const mutation = useMutation({
        mutationFn: async () => API.post("/auth/register/driver", LocalState.state),
        onSuccess: () => Invalidator(QUERY_KEYS.DRIVER_LIST())
    });
    const LocalState = usePartialState({
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        email: "",
        profilePhoto: "",
        passportNumber: "",
        operatingCity: "",
        birth: "",
        gender: "",
        operatingCountryName: "",
    });


    return <form className="space-y-4"
        onSubmit={e => {
            e.preventDefault();
            mutation.mutateAsync();
        }}
    >
        <InputGroup>
            <InputGroupInput
                placeholder="Enter the firstname"
                onChange={({ target }) => LocalState.setState({ firstName: target.value })}
            />
            <InputGroupAddon>
                <IconUser />
            </InputGroupAddon>
        </InputGroup>

        <InputGroup>
            <InputGroupInput
                placeholder="Enter the lastname"
                onChange={({ target }) => LocalState.setState({ lastName: target.value })}
            />
            <InputGroupAddon>
                <IconUser />
            </InputGroupAddon>
        </InputGroup>
{/* 
        <InputGroup>
            <InputGroupInput
                placeholder="Enter the password"
                value={LocalState.state.password}
                onChange={({ target }) => LocalState.setState({ password: target.value })}
            />
            <InputGroupAddon>
                <IconKey />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                <Badge
                    className="cursor-pointer"
                    onClick={() => LocalState.setState({ password: GenerateHumanPassword(9) })}
                >
                    Generate
                </Badge>
            </InputGroupAddon>
        </InputGroup> */}

        <InputGroup>
            <InputGroupInput
                placeholder="Enter the phone number"
                onChange={({ target }) => LocalState.setState({ phone: target.value })}
            />
            <InputGroupAddon>
                <IconPhoneCall />
            </InputGroupAddon>
        </InputGroup>

        <InputGroup>
            <InputGroupInput
                placeholder="Enter his email"
                onChange={({ target }) => LocalState.setState({ email: target.value })}
            />
            <InputGroupAddon>
                <IconMail />
            </InputGroupAddon>
        </InputGroup>

        <InputGroup>
            <InputGroupInput
                placeholder="Enter the CIN / Passport"
                onChange={({ target }) => LocalState.setState({ passportNumber: target.value })}
            />
            <InputGroupAddon>
                <IconBook />
            </InputGroupAddon>
        </InputGroup>

        <DatePicker
            value={new Date(LocalState.state.birth)}
            onChange={_ => LocalState.setState({ birth: _.toISOString() })}
        >
            <Button
                id="date"
                variant="outline"
                className="w-full justify-between font-normal"
            >
                {LocalState.state.birth ? LocalState.state.birth.split("T")[0] : "Select date"}
                <ChevronDownIcon />
            </Button>
        </DatePicker>

        <Combobox
            data={country.data?.data.content.map(_ => ({ value: _._id, label: _.name.common })) || []}
            onChange={operatingCountryName => LocalState.setState({ operatingCountryName })}
            value={LocalState.state.operatingCountryName}
            placeholder="Select a country"
            empty_message=""
        />

        <FileUpload
            auto_upload
            extensions={[]}
            onUploadedFile={profilePhoto => LocalState.setState({ profilePhoto })}
        >
            <p className="text-xs">Upload the profile picture.</p>
        </FileUpload>

        <Combobox
            data={["Male", "Female"].map(_ => ({ value: _, label: _ })) || []}
            onChange={gender => LocalState.setState({ gender })}
            value={LocalState.state.gender}
            placeholder="Select gender"
            empty_message=""
        />

        <InputGroup>
            <InputGroupInput
                onChange={({ target }) => LocalState.setState({ operatingCity: target.value })}
                placeholder="Enter the town name"
            />
            <InputGroupAddon>
                <MapPinIcon />
            </InputGroupAddon>
        </InputGroup>

        <Button
            className="w-full"
            disabled={mutation.isPending}
        >
            {mutation.isPending ? <Spinner /> : "Save"}
        </Button>
    </form>
};