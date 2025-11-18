import { useEffect, useState } from "react"
import {
    Calendar,
    TimeInput,
    Button,
    Select,
    SelectItem,
    CheckboxGroup,
    Checkbox,
    Card,
    CardBody,
    Input,
    DateValue,
} from "@heroui/react"

import conferenceIcon from "@/assets/conference.svg"
import desktopIcon from "@/assets/desktop.svg"

import { Entity } from "@/models"

import { format } from "date-fns"
import { entityClient } from '@/api/entityClient'
import { bookingClient } from '@/api/bookingClient'
import { userClient } from '@/api/userClient'

interface FormData {
    title: string
    startAt: Date | null
    endAt: Date | null
    entityId: string
    invitedUserIds: string[]
}

export const BookingForm = () => {
    const [form, setForm] = useState<FormData>({
        title: "",
        startAt: null,
        endAt: null,
        entityId: "",
        invitedUserIds: []
    })

    const [entities, setEntities] = useState<Entity[]>([])
    const [users, setUsers] = useState<{ id: string; name: string }[]>([])

    const [formError, setFormError] = useState<string>("")
    const [loading, setLoading] = useState(false)

    const entityAPI = entityClient()
    const userAPI = userClient()
    const bookingAPI = bookingClient()

    useEffect(() => {
        const fetchData = async () => {
            const e = await entityAPI.getAllEntities()
            setEntities(e)

            const u = await userAPI.getAllUsers()
            setUsers(u)
        }
        fetchData()
    }, [])

    const currentEntity = entities.find(e => e.id === form.entityId)
    const isMeetingRoom = currentEntity?.entity.type === "MeetingRoom"

    const handleChange = (field: keyof FormData, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        setFormError("")
        setLoading(true)
        try {
            if (!form.startAt || !form.endAt) {
                setFormError("Debes seleccionar una fecha y hora válidas.")
                setLoading(false)
                return
            }

            const payload = {
                title: form.title,
                startAt: form.startAt.toISOString(),
                endAt: form.endAt.toISOString(),
                entityId: form.entityId,
                invitedUserIds: form.invitedUserIds,
            }

            await bookingAPI.createBooking(payload)
            alert("Reserva creada correctamente")
            setForm({
                title: "",
                startAt: null,
                endAt: null,
                entityId: "",
                invitedUserIds: []
            })
        } catch (err: any) {
            setFormError(err?.message || "Error desconocido al crear la reserva")
        } finally {
            setLoading(false)
        }
    }

    const dateFromCalendar = (calendarDate: DateValue) => {
        return new Date(
            calendarDate.year,
            calendarDate.month - 1,
            calendarDate.day
        );
    };

    return (
        <Card className="w-full max-w-2xl mx-auto bg-black/50 backdrop-blur-xl border border-white/15 p-6 rounded-3xl text-white">
            <CardBody className="flex flex-col gap-8">

                <Input
                    label="Título"
                    placeholder="Nombre de la reserva"
                    variant="bordered"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    color='success'
                />

                <div className="flex flex-col gap-2 items-center">
                    <p className="text-sm text-success">Fecha</p>
                    <Calendar
                        onChange={(date) => {
                            const localDate = dateFromCalendar(date);
                            handleChange("startAt", localDate);
                        }}
                    />
                </div>

                <div className="flex gap-4">

                    <TimeInput
                        label="Hora de inicio"
                        onChange={(t) => {
                            if (form.startAt) {
                                const d = new Date(form.startAt)
                                d.setHours(t!.hour, t!.minute, 0, 0)
                                handleChange("startAt", d)
                            }
                        }}
                    />

                    <TimeInput
                        label="Hora de fin"
                        onChange={(t) => {
                            if (form.startAt) {
                                const d = new Date(form.startAt)
                                d.setHours(t!.hour, t!.minute, 0, 0)
                                handleChange("endAt", d)
                            }
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-success">Seleccionar entidad</p>

                    <Select
                        label="Entidad"
                        placeholder="Elegir sala o puesto"
                        variant="bordered"
                        selectedKeys={[form.entityId]}
                        onSelectionChange={(keys) => handleChange("entityId", [...keys][0])}
                    >
                        {entities.map((entity) => (
                            <SelectItem key={entity.id} textValue={entity.name}>
                                <div className="flex justify-between items-center w-full">
                                    <span>{entity.name}</span>
                                    <img
                                        src={entity.entity.type === "MeetingRoom" ? conferenceIcon : desktopIcon}
                                        className="w-6 h-6 opacity-80"
                                    />
                                </div>
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                {isMeetingRoom && (
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-white/70">Invitar usuarios</p>

                        <CheckboxGroup
                            color="primary"
                            value={form.invitedUserIds}
                            onChange={(value) => handleChange("invitedUserIds", value)}
                        >
                            {users.map((u) => (
                                <Checkbox key={u.id} value={u.id}>
                                    {u.name}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </div>
                )}

                <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-sm space-y-1 text-white/80">
                    <p><strong>Título:</strong> {form.title || "—"}</p>
                    <p><strong>Fecha:</strong> {form.startAt ? format(form.startAt, "dd/MM/yyyy") : "—"}</p>
                    <p><strong>Inicio:</strong> {form.startAt ? format(form.startAt, "HH:mm") : "—"}</p>
                    <p><strong>Fin:</strong> {form.endAt ? format(form.endAt, "HH:mm") : "—"}</p>
                    <p><strong>Entidad:</strong> {currentEntity?.name || "—"}</p>
                </div>

                {formError && (
                    <p className="text-red-400 text-sm text-center">{formError}</p>
                )}

                <Button
                    color="primary"
                    variant="shadow"
                    isLoading={loading}
                    onPress={handleSubmit}
                    className="w-full mt-4"
                >
                    Crear reserva
                </Button>
            </CardBody>
        </Card>
    )
}
